import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Reset from './reset';
import { ThemeProvider } from 'styled-components';
import themes from './themes';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Reset />
            <ThemeProvider theme={themes}>
                <App />
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
