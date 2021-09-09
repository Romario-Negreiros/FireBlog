import 'styled-components';

declare module 'styled-components' {
    // To overwrite a types selection
    export interface DefaultTheme {
        // The type selection I want to overwrite
        title: string;
        backgrounds: {
            primary: string;
            secondary: string;
            elements: string;
            cards: string;
        };
        colors: {
            primary: string;
            secondary: string;
            error: string;
        };
        fonts: {
            primary: string;
        }
    }
}
