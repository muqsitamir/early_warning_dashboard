import React from 'react';
import {Route, Redirect} from 'react-router-dom';


export default function OnlyPublicRoute({Component, ...rest}) {
    const loginStatus = localStorage.getItem("token");
    debugger;
    return (
        <Route
            {...rest}
            render={(props) => {
                return !loginStatus ? <Component {...props} /> : window.location = '/';
            }}
        />
    );
}
