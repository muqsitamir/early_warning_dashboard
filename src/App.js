import React from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom"
// import NotFound from "../components/not-found";
// import TopAppBar.js from "../components/Headers/top-app-bar";
// import Login from "../components/Authentication/login";
// import Register from "../components/Authentication/register";
// import ResetPassword from "../components/Authentication/resetPassword";
// import NewPassword from "../components/Authentication/newPassword";
// import ResendPassword from "../components/Authentication/resendPassword";
// import ProtectedRoute from "../reuseable-components/protectedRoute"
// import MessageSnackbar from "../reuseable-components/snackbar";
// import ReactSpinner from "../reuseable-components/react-spinner";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import TopAppBar from "./Headers/TopAppBar/TopAppBar";
import Login from './pages/Authentication/Login'
import Logout from "./pages/Authentication/Logout";
import UserInfo from "./pages/Authentication/UserInfo";


function App () {
        return (
            <React.Fragment>
                <TopAppBar/>
                {/*<ReactSpinner/>*/}
                {/*<Switch>*/}
                <ProtectedRoute exact path='/' Component={Home} />
                <Route exact path='/login' render={(props) => <Login {...props}/>}/>
                <Route exact path='/userinfo' render={(props) => <UserInfo {...props}/>}/>
                <Route exact path='/logout' render={(props) => <Logout {...props}/>}/>
                {/*    <Route exact path='/register' render={(props) => <Register {...props}/>}/>*/}
                {/*    <Route path='/reset-password' render={(props) => <ResetPassword {...props}/>}/>*/}
                {/*    <Route path='/new-password/:token' render={(props) => <NewPassword {...props}/>}/>*/}
                {/*    <Route exact path='/resend/new-password' render={(props) => <ResendPassword {...props}/>}/>*/}
                {/*    <Route path='/not-found' component={NotFound}/>*/}
                {/*    <Redirect to='/not-found'/>*/}
                {/*</Switch>*/}
                {/*<MessageSnackbar/>*/}
            </React.Fragment>
        );
}

export default App;
