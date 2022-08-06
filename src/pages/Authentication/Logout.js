import React,{useEffect} from 'react';
import { logout } from './userSlice';
import {useDispatch} from "react-redux";

export default function Logout(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
    }, []);
}

