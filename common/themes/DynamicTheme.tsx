import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ReactNode } from 'react';

import theme from '@/common/themes';

const GlobalStyle = createGlobalStyle`
    body {}
`;

interface IProps {
  children: ReactNode;
}

const DynamicTheme = ({ children }: IProps) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  );
};

export default DynamicTheme;
