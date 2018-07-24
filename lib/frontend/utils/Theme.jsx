import React from 'react';
import { injectGlobal, css } from 'styled-components';

export const themes = {
  light: {
    background: '#ccc',
    cardBackgroundColor: 'white',
    cardFontColorBright: 'rgba(255,255,255,1)',
    cardFontColorBrightLight: 'rgba(255,255,255,0.7)',
    cardFontColorDark: 'rgba(0,0,0,1)',
    cardFontColorLightDark: 'rgba(0,0,0,0.7)',

  },
  dark: {
    background: '#222',
    cardBackgroundColor: 'black',
    cardFontColorBright: 'rgba(255,255,255,1)',
    cardFontColorBrightLight: 'rgba(255,255,255,0.7)',
    cardFontColorDark: 'rgba(0,0,0,1)',
    cardFontColorLightDark: 'rgba(0,0,0,0.7)',
  },
};
const ThemeContext = React.createContext(themes.light);


class GlobalThemeComponent extends React.Component {
  componentDidMount() {
    injectGlobal`
      body{
        background: ${this.props.theme.background};
      }
    `;
  }


  render() {
    return (this.props.children);
  }
}


export const ThemeProvider = props => (
  <ThemeContext.Provider value={props.value}>
    <ThemeContext.Consumer>
      {theme => <GlobalThemeComponent {...props} theme={theme} />}
    </ThemeContext.Consumer>
  </ThemeContext.Provider>
);
export const ThemeConsumer = ThemeContext.Consumer;
