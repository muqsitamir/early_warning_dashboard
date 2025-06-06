import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom"
import MessageSnackbar from "./reusable_components/SnackBar";
import ResetPassword from "./Authentication/ResetPassword";
import Home from "./pages/Home";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import Login from './Authentication/Login'
import Logout from "./Authentication/Logout";
import TopAppBarProtection from "./Headers/TopAppBar/TopAppBarProtection";
import TopAppBar from "./Headers/TopAppBar/TopAppBar";
import NotFound from "./reusable_components/NotFound";
import ReactSpinner from "./reusable_components/ReactSpinner";
import Cameras from "./pages/Cameras";
import OnlyPublicRoute from "./Authentication/OnlyPublicRoute";
import CameraDetailsPage from './pages/CameraDetailsPage';
import Profile from './pages/Profile'
import NewPassword from "./pages/password_reset";

export const backend_url = 'https://api.tpilums.org.pk'
// export const backend_url = 'http://0.0.0.0:8000'
export const googleMapsApiKey='AIzaSyBup6K7zk3Hp7u53HmAVCMwqeEfFCEf70Q';


export default function App () {
        return (
            <React.Fragment>
                <TopAppBarProtection Component={TopAppBar} />
                <ReactSpinner/>
                <Switch>
                <ProtectedRoute exact path='/' Component={Home} />
                <ProtectedRoute exact path='/cameras' Component={Cameras} />
                <ProtectedRoute exact path='/profile' Component={Profile}/>
                <ProtectedRoute exact path='/statistics/:id' Component={CameraDetailsPage} />
                <OnlyPublicRoute exact path='/resetpassword/:uid/:token' Component={NewPassword} />
                <OnlyPublicRoute exact path='/login' Component={Login} />
                <Route exact path='/logout' render={(props) => <Logout {...props}/>}/>
                <Route path='/reset-password' render={(props) => <ResetPassword {...props}/>}/>
                <Route path='/not-found' component={NotFound}/>
                <Redirect to='/not-found'/>
                </Switch>
                <MessageSnackbar/>
            </React.Fragment>
        );
}

