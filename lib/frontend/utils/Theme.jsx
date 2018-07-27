import React from 'react';
import { injectGlobal } from 'styled-components';

export const themes = {
  light: {
    background: '#ccc',
    fontSize: '100%',
    cardBackgroundColor: 'white',
    cardFontColorBright: 'rgba(255,255,255,1)',
    cardFontColorBrightLight: 'rgba(255,255,255,0.7)',
    cardFontColorDark: 'rgba(0,0,0,1)',
    cardFontColorLightDark: 'rgba(0,0,0,0.7)',
    graphColor: 'rgba(0,0,0,0.3)',
    headlineColor: 'black',
    headlineBackground: '#eee',
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
    headlineColor: 'white',
    headlineBackground: '#777',
  },
};
const ThemeContext = React.createContext(themes.light);


class GlobalThemeComponent extends React.Component {
  componentDidMount() {
    /* eslint-disable-next-line */
    injectGlobal`
    html {
      font-size: ${this.props.theme.fontSize};
    }
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
