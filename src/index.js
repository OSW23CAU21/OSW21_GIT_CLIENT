import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {setChonkyDefaults} from 'chonky';
import {ChonkyIconFA} from 'chonky-icon-fontawesome';

setChonkyDefaults({ iconComponent : ChonkyIconFA});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
