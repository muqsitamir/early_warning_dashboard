import React from "react";
import TopAppBarIndex from "./top-app-bar--index";

export default function TopAppBar(){
        return (
            <>
                {
                    window.location.pathname.startsWith("/login") ? null :
                        window.location.pathname.startsWith("/register") ? null :
                            window.location.pathname.startsWith("/reset-password") ? null :
                                window.location.pathname.startsWith("/resend/new-password") ? null :
                                window.location.pathname.startsWith("/new-password/") ? null :
                                    <TopAppBarIndex/>
                }
            </>
        );
}
