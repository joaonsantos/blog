import React from "react";
import ReactDOM from 'react-dom';

import App from "./components/App";

const appRoot = document.getElementById('root');
appRoot ? ReactDOM.render( <App /> , appRoot): false;
