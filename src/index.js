import React from 'react';  // React Library
import ReactDOM from 'react-dom';   // DOM library
import './index.scss';  // Import CSS
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('app'));   // Render the react app
