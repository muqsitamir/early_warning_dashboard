import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setUserInfo} from "./userSlice";
import {Redirect} from "react-router-dom";


export default function UserInfo(){
    const dispatch = useDispatch();
    let user_data = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        dispatch(setUserInfo(user_data))
    }, [])
    localStorage.removeItem('user');
    return(
        <Redirect to='/' />
    );
}