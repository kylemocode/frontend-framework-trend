import styled, { keyframes, css } from 'styled-components';

const rotateKeyframe = keyframes`
    from {
    transform: rotate(0deg);
    }

    to {
    transform: rotate(360deg);
    }
`;

export enum LoadingCircleIntent {
  Black,
  White,
}

interface IProps {
  intent?: LoadingCircleIntent;
}
interface Attrs {
  intent: LoadingCircleIntent;
}

const THEMES = {
  [LoadingCircleIntent.White]: css<Attrs>`
    --loading-circle-stroke: white;
  `,
  [LoadingCircleIntent.Black]: css<Attrs>`
    --loading-circle-stroke: 'rgba(0, 0, 0, 0.35)';
  `,
};

const RADIUS = 22;
const MIN_DASH_LENGTH = 8;
const circumference = Math.floor(RADIUS * 2 * Math.PI);
const fillLength = circumference * 0.75;
const unfillLength = circumference * 0.25;

const LoadingCircle = ({ intent = LoadingCircleIntent.White }: IProps) => (
  <Svg viewBox='0 0 60 60' intent={intent}>
    <Circle cx='30' cy='30' r='22' strokeWidth='4' fill='transparent' />
  </Svg>
);

export default LoadingCircle;

const dash = keyframes`
  0% {
    stroke-dasharray: ${MIN_DASH_LENGTH} ${circumference - MIN_DASH_LENGTH};
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: ${fillLength} ${unfillLength};
    stroke-dashoffset: -${unfillLength};
  }
  100% {
    stroke-dasharray: ${fillLength} ${circumference - MIN_DASH_LENGTH};
    stroke-dashoffset: -${circumference};
  }
`;
const Svg = styled.svg<Attrs>`
  animation: ${rotateKeyframe} 2s linear infinite;

  ${props => THEMES[props.intent]};
`;
const Circle = styled.circle`
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke: var(--loading-circle-stroke);
`;
