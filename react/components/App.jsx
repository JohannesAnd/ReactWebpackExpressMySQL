import ReactDOM from 'react-dom';
import React from "react";
import {IndexRoute, Redirect, Route, Router} from "react-router";

import ListContainer from "./ListContainer";

import routes from "./../../routes";


ReactDOM.render((
    <Router>
        {routes}
    </Router>
), document.getElementById("content"));