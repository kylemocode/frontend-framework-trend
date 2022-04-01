import { FC, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal: FC = ({ children }) => {
  const [container, setContainer] = useState<HTMLDivElement>();

  useLayoutEffect(() => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    setContainer(el);
    return () => {
      if (el) {
        document.body.removeChild(el);
      }
    };
  }, []);

  return container ? createPortal(children, container) : null;
};

export default Portal;
