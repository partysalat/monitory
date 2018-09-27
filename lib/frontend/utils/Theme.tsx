import React from 'react';
import {injectGlobal} from 'styled-components';

export interface Theme {
    readonly background: string;
    readonly fontSize: string;
    readonly cardBackgroundColor: string;
    readonly cardFontColorBright: string;
    readonly cardFontColorBrightLight: string;
    readonly cardFontColorDark: string;
    readonly cardFontColorLightDark: string;
    readonly graphColor: string;
    readonly listAssigneeColor: string;
    readonly listFailedColor: string;
    readonly headlineColor: string;
    readonly headlineBackground: string;
}

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
        listAssigneeColor: '#efd700',
        listFailedColor: 'red',
        headlineColor: 'black',
        headlineBackground: '#eee',
    } as Theme,
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
        headlineColor: 'white',
        headlineBackground: '#777',
    } as Theme,
};
const ThemeContext = React.createContext(themes.light);
interface ThemeProviderProps{
    value: Theme
}

class GlobalThemeComponent extends React.Component<ThemeProviderProps, any> {
    componentDidMount() {
        /* eslint-disable-next-line */
        injectGlobal`
        html {
          font-size: ${this.props.value.fontSize};
        }
        body{
          background: ${this.props.value.background};
        }
    `;
    }


    render() {
        return (this.props.children);
    }
}

export const ThemeProvider = (props:ThemeProviderProps) => (
    <ThemeContext.Provider value={props.value}>
        <ThemeContext.Consumer>
            {theme => <GlobalThemeComponent {...props} value={theme as Theme}/>}
        </ThemeContext.Consumer>
    </ThemeContext.Provider>
);
export const ThemeConsumer = ThemeContext.Consumer;
