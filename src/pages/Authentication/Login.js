import React from "react";
import {Link} from "react-router-dom";
import Textfield from "../../utils/TextField";
import Form from "../../utils/Form";
import Joi from 'joi-browser';
import {connect} from "react-redux";
import {login} from './userSlice'


class Login extends Form {

    state = {
        isHidden: true,
        data: {
            username: "",
            password: "",
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().error(errors => {
            return errors.map(error => {
                switch (error.type) {
                    case "any.empty":
                        return {message: "Username is required"};
                }
            })
        }),
        password: Joi.string().required().min(8).error(errors => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.min":
                        return {message: "Your password must contain 8 characters"};
                    case "any.empty":
                        return {message: "Password is required"};
                }
            })
        })
    };


    doSubmit = (event) => {
        const user = {
            username: this.state.data.username,
            password: this.state.data.password
        };
        this.props.login(user, this.props);
    };

    render() {
        return (
            <div className="page">
                <div className="page__content">
                    <div className="auth_master-form tc center">
                        <div className="shadow-0 pa3 auth_page-auth">

                            {/* */}
                            <div className="mb4 mt3">
                                <img className="w-20 h-20" src={require("../../images/wwf_logo.png")} alt=""/>
                                <h4>Sign in to your account</h4>
                            </div>
                            {/* */}
                            <div className="mb4">
                                <form className="form-register">
                                    {/* */}
                                    <Textfield
                                        name="username"
                                        label="Username "
                                        type="text"
                                        onChange={this.handleChange}
                                        value={this.state.data.username}
                                        error={this.state.errors.username}
                                        autoFocus={true}/>

                                    {/* */}
                                    <Textfield
                                        name="password"
                                        label="Password"
                                        type={this.state.isHidden ? 'password' : 'text'}
                                        onChange={this.handleChange}
                                        error={this.state.errors.password}
                                        value={this.state.data.password}
                                        onClick={this.onIconClick}
                                        isHidden={this.state.isHidden}
                                        changeHidden={this.changeHidden}/>

                                    {/* */}
                                    <div className="mv1">
                                        <div className="flex">
                                            <div className="flex-grow-1"/>
                                            <div>
                                                <Link to="/reset-password">Forgot your password?</Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* */}

                                    <div className="mv2 pt3">
                                        <button className="btn btn-xl btn-primary btn-block text-white btn-shadow"
                                                disabled={this.validateForm()} onClick={this.handleSubmit}>SIGN
                                            IN
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                        {/* */}
                        {/*<div className="mv2" style={{fontSize: '.875rem'}}>*/}
                        {/*    <p>Need a Bambiha account?*/}
                        {/*        <Link title="Sign up" to="/register"> Create an account</Link></p>*/}
                        {/*</div>*/}
                        {/* */}
                        <div className="mv3 ">
                            <div className="flex items-center justify-center">
                                ©
                                <span className="mr2" style={{fontSize: '.875rem'}}>2021</span>
                                <span className="dot"/>
                                <Link className="di mh2 fw4" style={{fontSize: '.875rem', color: '#576c77'}}
                                      title="Terms of Service"
                                      to="#" target="_blank">Terms of Service</Link>
                                <span className="dot"/>
                                <Link className="di mh2 fw4" style={{fontSize: '.875rem', color: '#576c77'}}
                                      title="Terms of Service"
                                      to="#" target="_blank">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loginStatus: state.user,
});

export default connect(mapStateToProps, {login})(Login);