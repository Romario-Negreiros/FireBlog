import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Reset from './styles/reset';
import { ThemeProvider } from 'styled-components';
import themes from './styles/themes';
import 'react-toastify/dist/ReactToastify.css';

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
