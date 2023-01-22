import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import './index.css';

const token = localStorage.getItem('token');
const loggedin_time = localStorage.getItem('loggedin_time');
const url = 'https://nusgossip-api.onrender.com/logout';

export function getLoggedIn() {
    return JSON.parse(localStorage.getItem('logged'));
}
export function setLoggedIn(bool) {
    localStorage.setItem('logged', bool);
}

export function setLoggedInTime(time) {
    localStorage.setItem('loggedin_time', time);
}

export const handleSpace = (e) => {
    if (e.key === ' ') {
        e.preventDefault();
    }
}

//sets localstorage items to '' for first time visitors
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

if (loggedin_time === null) {
    localStorage.setItem('loggedin_time', '');
} else if (loggedin_time !== '') {
    //logs out user after 2 weeks due to jwt expiring in 2 weeks
    if (moment().diff(moment(loggedin_time), 'weeks', true) >= 2) {
        axios.delete(url, {headers:{"Authorization": 'Bearer ' + token}})
            .then(response => {
                setLoggedIn(false);
                setLoggedInTime('');
                localStorage.setItem('token', '');
                localStorage.setItem('user_id', '');
                localStorage.setItem('username', '');
            })
            .catch(error => console.log(error));
    }
}

//changes website theme to user system light or dark mode preference
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