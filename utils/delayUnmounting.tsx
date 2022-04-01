import { Component, ComponentType, forwardRef, Ref } from 'react';

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

interface IDelayUnmountingProps {
  show: boolean;
  delay?: number;
  onUnmounted?: () => void;
}

function delayUnmounting<WProps extends Record<string, any>>(
  WrappedComponent: ComponentType<WProps>,
  defaultDelay = 500
) {
  type DelayUnmountCompProps = IDelayUnmountingProps &
    WProps & {
      forwardedRef: Ref<typeof WrappedComponent>;
    };
  type DelayUnmountCompState = {
    shouldRender: boolean;
  };

  class DelayUnmountComponent extends Component<
    DelayUnmountCompProps,
    DelayUnmountCompState
  > {
    timer?: number;

    constructor(props: DelayUnmountCompProps) {
      super(props);
      this.state = {
        shouldRender: props.show,
      };
    }

    componentDidUpdate(prevProps: DelayUnmountCompProps) {
      const { show, delay, onUnmounted } = this.props;

      if (show) {
        clearTimeout(this.timer);
      } else if (prevProps.show) {
        // @ts-ignore
        this.timer = setTimeout(() => {
          this.setState({ shouldRender: false });
          onUnmounted?.();
        }, delay);
      }
    }

    // @ts-ignore
    static getDerivedStateFromProps(nextProps) {
      if (nextProps.show) {
        return { shouldRender: true };
      }
      return null;
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    render() {
      const { forwardedRef, onUnmounted, ...rest } = this.props;
      const { shouldRender } = this.state;

      // @ts-ignore all the props should be assigned to the constraint of WProps
      return shouldRender ? (
        // @ts-ignore
        <WrappedComponent ref={forwardedRef} {...rest} />
      ) : null;
    }
  }

  // @ts-ignore override component's display name
  DelayUnmountComponent.displayName = `(${getDisplayName(WrappedComponent)})`;

  // @ts-ignore set default props
  DelayUnmountComponent.defaultProps = {
    show: false,
    delay: defaultDelay,
  };

  return forwardRef<typeof WrappedComponent, IDelayUnmountingProps & WProps>(
    (props, ref) => <DelayUnmountComponent {...props} forwardedRef={ref} />
  );
}

export default delayUnmounting;
