import React,{useState} from "react";
import { Link } from "react-router-dom";
//import MenuIcon from '@mui/icons-material/Menu';
//import { showSideNav } from '../../reusable_components/site_data/siteDataSlice'
import './style.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from "react-redux";

export default function TopAppBar(){
   // const dispatch = useDispatch()
    /*const handle_side_nav = () => {
        dispatch(showSideNav());
    }
*/
const user = JSON.parse(localStorage['user']);
console.log("organization: " + user.organization);
const username=user.first_name+" "+user.last_name;
const organization = user.organization;
const dispatch = useDispatch();
const [dropdownOpen, setDropdownOpen] = useState(false);
    const handle_camera_click = () => {
        window.location = '/cameras';
    }
 const handle_profile_click=()=>{
    window.location="/profile";
 }
 const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
};
const handle_admin_click = () => {
    window.location = 'https://api.tpilums.org.pk/admin';
};

const handleChangePassword = () => {
    window.location = '/change-password';
};

const handleLogout = () => {
    window.location = '/logout';
};

    return (
        <header  style={{ background: 'white' }} className="mdc-top-app-bar mdc-top-app-bar--shadow__ mdc-top-app-bar--fixed js-top-app-bar"
                data-mdc-auto-init="MDCTopAppBar">
            <div className="mdc-top-app-bar__row contain-full-bleed links--muted ">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    
                    <Link to="/" className="mdc-top-app-bar__title">
                        <img width='120' src={require("../../images/LUMS.png")} alt="Project Logo"/>
                    </Link>
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
                    <button className="mdc-button mdc-theme--primary mdc-top-app-bar__action-item profile-button" onClick={toggleDropdown}>
                        <AccountCircleIcon style={{ fontSize: 40 }} /> {/* Use the icon */}
                    </button>
                    
                    {dropdownOpen && (
                        <div className="dropdown-menu1" style={{display:'flex !important'}}>
                            <span style={{color:'black',fontWeight:'700',textAlign:'center'}}>{username}( <sub>{organization}</sub>)</span>
                            <br/>
                            {organization === "CVGL" && (
                             <button  onClick={handle_admin_click}>Admin</button>
                            )}
                            <button onClick={handleChangePassword}>Change Password</button>
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    )}
                    <button
                        className="menu-mobile material-icons mdc-theme--primary mdc-top-app-bar__navigation-icon mdc-icon-button dn-l js-trigger-mdc-drawer"
                        aria-label="Open navigation menu">menu
                    </button>
                </section>

            </div>
        </header>
    );
}
