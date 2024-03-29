import React, { PropsWithChildren } from 'react';
import { css, createGlobalStyle } from 'styled-components';
export interface Theme {
  background: string;
  fontSize: string;
  cardBackgroundColor: string;
  cardFontColorBright: string;
  cardFontColorBrightLight: string;
  cardFontColorDark: string;
  cardFontColorLightDark: string;
  graphColor: string;
  listAssigneeColor: string;
  listFailedColor: string;
  statusFailedColor: string;
  statusCheckColor: string;
  statusInvestigatedColor: string;
  headlineColor: string;
  headlineBackground: string;
  customCss: string;
}

export const themes: Record<'light' | 'dark', Theme> = {
  light: {
    background: '#ccc',
    fontSize: '100%',
    cardBackgroundColor: 'white',
    cardFontColorBright: 'rgba(255,255,255,1)',
    cardFontColorBrightLight: 'rgba(255,255,255,0.7)',
    cardFontColorDark: 'rgba(0,0,0,1)',
    cardFontColorLightDark: 'rgba(0,0,0,0.7)',
    graphColor: 'rgba(0,0,0,0.3)',
    listAssigneeColor: '#efd700',
    listFailedColor: 'red',
    statusFailedColor: 'red',
    statusCheckColor: 'green',
    statusInvestigatedColor: '#efd700',
    headlineColor: 'black',
    headlineBackground: '#eee',
    customCss: '',
  },
  dark: {
    background: '#222',
    fontSize: '100%',
    cardBackgroundColor: '#444',
    cardFontColorBright: 'rgba(255,255,255,1)',
    cardFontColorBrightLight: 'rgba(255,255,255,0.7)',
    cardFontColorDark: 'rgba(0,0,0,1)',
    cardFontColorLightDark: 'rgba(0,0,0,0.7)',
    graphColor: 'rgba(255,255,255,0.3)',
    listAssigneeColor: '#efd700',
    listFailedColor: 'red',
    statusFailedColor: 'red',
    statusCheckColor: 'green',
    statusInvestigatedColor: '#efd700',
    headlineColor: 'white',
    headlineBackground: '#777',
    customCss: '',
  },
};
const ThemeContext = React.createContext(themes.light);

class GlobalThemeComponent extends React.Component<
  PropsWithChildren<{ theme: Theme }>,
  any
> {
  componentDidMount() {
    const GlobalStyle = createGlobalStyle`
    html {
      font-size: ${this.props.theme.fontSize};
    }
    body{
      background: ${this.props.theme.background};
    }
    ${css`
      ${this.props.theme.customCss}
    `}
    `;
    this.setState({ globalStyle: GlobalStyle });
  }

  render() {
    const GlobalStyle = this.state && this.state.globalStyle;
    return (
      <>
        {GlobalStyle && <GlobalStyle />}
        {this.props.children}
      </>
    );
  }
}

export const ThemeProvider: React.FC<{ value: Theme }> = (props) => (
  <ThemeContext.Provider value={props.value}>
    <ThemeContext.Consumer>
      {(theme) => <GlobalThemeComponent {...props} theme={theme} />}
    </ThemeContext.Consumer>
  </ThemeContext.Provider>
);
export const ThemeConsumer = ThemeContext.Consumer;
export function useGetTheme() {
  return React.useContext(ThemeContext);
}
