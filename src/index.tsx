import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import themes from './themes';
import { ThemeProvider } from 'styled-components';
import './reset.css';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={themes}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
