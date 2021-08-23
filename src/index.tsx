import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import themes from './themes';
import { ThemeProvider } from 'styled-components';
import './reset.css';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={themes}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
