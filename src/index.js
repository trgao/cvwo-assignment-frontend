import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import './index.css';

const token = localStorage.getItem('token');

export function getLoggedIn() {
    return JSON.parse(localStorage.getItem('logged'));
}
export function setLoggedIn(bool) {
    localStorage.setItem('logged', bool);
}

if (token === null) {
    localStorage.setItem('token', '');
    setLoggedIn(false);
} else if (token !== '') {
    setLoggedIn(true);
} else if (token === '') {
    setLoggedIn(false);
}
if (localStorage.getItem('user_id') === null) {
    localStorage.setItem('user_id', '');
}
if (localStorage.getItem('username') === null) {
    localStorage.setItem('username', '');
}
if (localStorage.getItem('darkmode') === null) {
    localStorage.setItem('darkmode', window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.setProperty('--darkmode', 1);
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App /> 
        </BrowserRouter>
    </React.StrictMode>
);