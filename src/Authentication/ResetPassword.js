import React from 'react';
import {Link} from 'react-router-dom';
import Form from "../reusable_components/Form";
import Joi from 'joi-browser';
import TextField from "../reusable_components/TextField";


export default class ResetPassword extends Form {
    state = {
        data: {email: ""},
        errors: {}
    };
    schema = {
        email: Joi.string().required().email().error(errors => {
            return errors.map(error => {
                switch (error.type) {
                    case "string.email":
                        return {message: "Please enter a valid email"};
                    case "any.empty":
                        return {message: "Email is required"};
                }
            })
        })
    };
    doSubmit = event => {
        event.preventDefault();

    };

    render() {
        return (
            <div>
                <div className="page">
                    <div className="page__content">
                        <div className="auth_master-form tc center">
                            <div className="shadow-0 pa3 auth_page-auth">
                                <div className="mb4 mt3">
                                    <h4>Forgot your password</h4>
                                </div>
                                <div className="mb4 col">
                                    <form className="form-register">
                                        <TextField
                                            name="email"
                                            label="Enter your registered email"
                                            type="email"
                                            onChange={this.handleChange}
                                            value={this.state.data.email}
                                            error={this.state.errors.email}
                                            autoFocus={true}/>
                                        <div className="mv2 pt3">
                                            <button className="btn btn-xl btn-primary btn-block text-white btn-shadow"
                                                    onClick={this.doSubmit}>SUBMIT
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* */}
                            <div className="mt4" style={{fontSize: '.875rem'}}>
                                <Link to='/login'>
                                     <i className="material-icons-outlined v-mid mr1"
                                            style={{color: '#0258ff', fontSize: '15px'}}>arrow_back_ios</i>
                                        <span>Back to Login</span>
                                </Link>
                            </div>
                            {/* */}
                            <div className="pv2 mb4">
                                <div className="flex items-center justify-center">
                                    ©
                                    <span className="mr2" style={{fontSize: '.875rem'}}>2021</span>
                                    <span className="dot"/>
                                    <Link className="di mh2 fw4" style={{fontSize: '.875rem', color: '#576c77'}}
                                          title="Terms of Service" to="/terms-of-service" target="_blank">Terms of
                                        Service</Link>
                                    <span className="dot"/>
                                    <Link className="di mh2 fw4" style={{fontSize: '.875rem', color: '#576c77'}}
                                          title="Terms of Service" to="/privacy-policy" target="_blank">Privacy
                                        Policy</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


