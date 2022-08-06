import React from 'react';
import {Route, Redirect} from 'react-router-dom';


export default function ProtectedRoute({Component, ...rest}) {
    const loginStatus = localStorage.getItem("loginStatus");
    return (
        <Route
            {...rest}
            render={(props) => {
                return loginStatus ? <Component {...props} /> : <Redirect to='/login'/>
            }}
        />
    );
}
