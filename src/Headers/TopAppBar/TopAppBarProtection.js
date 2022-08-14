import React from 'react';


export default function TopAppBarProtection({Component}) {
    let check = localStorage.getItem('token') ? true : false;
    return (
        check ? < Component /> : null
    );
}