import React from 'react';  // React Library
import ReactDOM from 'react-dom';   // DOM library
import './index.scss';  // Import CSS
import App from './components/App.jsx';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById('app'));   // Render the react app
