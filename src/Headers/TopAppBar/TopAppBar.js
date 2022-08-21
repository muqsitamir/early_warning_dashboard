import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { showSideNav } from '../../reusable_components/site_data/siteDataSlice'
import { useDispatch } from "react-redux";

export default function TopAppBar(){
    const dispatch = useDispatch()
    const handle_side_nav = () => {
        dispatch(showSideNav());
    }

    const handle_camera_click = () => {
        window.location = '/cameras';
    }

    return (
        <header  style={{ background: 'white' }} className="mdc-top-app-bar mdc-top-app-bar--shadow__ mdc-top-app-bar--fixed js-top-app-bar"
                data-mdc-auto-init="MDCTopAppBar">
            <div className="mdc-top-app-bar__row contain-full-bleed links--muted ">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button className="mdc-icon-button" onClick={handle_side_nav}>
                        <MenuIcon sx={{ color: '#082344' }} fontSize='medium'/>
                    </button>
                    <Link to="/" className="mdc-top-app-bar__title">
                        <img width='50' src={require("../../images/wwf_logo.png")} alt="Project Logo"/>
                    </Link>
                </section>
                <section className="mdc-top-app-bar__section app-shop mdc-top-app-bar__section--align-end mr4"
                         role="toolbar">
                    <Link to="/" className="show-lg link-mute">
                        <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" >
                            <span className="mdc-button__ripple"/>
                            <span className="mdc-button__label">Home</span>
                        </button>
                    </Link>
                    {/*<Link to="/cameras" className="show-lg link-mute">*/}
                        <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item" onClick={handle_camera_click}>
                            <span className="mdc-button__ripple"/>
                            <span className="mdc-button__label">Cameras</span>
                        </button>
                    {/*</Link>*/}
                    <a href="https://api.tpilums.org.pk/admin" className="show-lg link-mute">
                        <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item">
                            <span className="mdc-button__ripple"/>
                            <span className="mdc-button__label">Admin</span>
                        </button>
                    </a>
                    <button
                        className="menu-mobile material-icons mdc-theme--primary mdc-top-app-bar__navigation-icon mdc-icon-button dn-l js-trigger-mdc-drawer"
                        aria-label="Open navigation menu">menu
                    </button>
                </section>

            </div>
        </header>
    );
}
