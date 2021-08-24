import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { BrowserRouter as Router } from 'react-router-dom';
import Reset from './reset';

ReactDOM.render(
    <React.StrictMode>
            <Router>
                <Reset />
                <App />
            </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
