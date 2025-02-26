import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "../reusable_components/TextField";
import { backend_url } from "../App";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../reusable_components/site_data/siteDataSlice";

const ResetPassword = () => {
    const [data, setData] = useState({ email: "" });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const doSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${backend_url}/accounts/api/send-reset-password/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email }),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors({ email: result.error || result.message });
            } else {
                dispatch(setSnackBar("Reset password link sent successfully!"));
            }
        } catch (error) {
            dispatch(setSnackBar("Something went wrong. Please try again later."));
            setErrors({ email: "Something went wrong. Please try again later." });
        }
    };

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
                                <form className="form-register" onSubmit={doSubmit}>
                                    <TextField
                                        name="email"
                                        label="Enter your registered email"
                                        type="email"
                                        onChange={handleChange}
                                        value={data.email}
                                        error={errors.email}
                                        autoFocus
                                    />
                                    <div className="mv2 pt3">
                                        <button
                                            className="btn btn-xl btn-primary btn-block text-white btn-shadow"
                                            type="submit"
                                        >
                                            SUBMIT
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mt4" style={{ fontSize: ".875rem" }}>
                            <Link to="/login">
                                <i
                                    className="material-icons-outlined v-mid mr1"
                                    style={{ color: "#0258ff", fontSize: "15px" }}
                                >
                                    arrow_back_ios
                                </i>
                                <span>Back to Login</span>
                            </Link>
                        </div>
                        <div className="pv2 mb4">
                            <div className="flex items-center justify-center">
                                ©
                                <span className="mr2" style={{ fontSize: ".875rem" }}>
                                    2021
                                </span>
                                <span className="dot" />
                                <Link
                                    className="di mh2 fw4"
                                    style={{ fontSize: ".875rem", color: "#576c77" }}
                                    title="Terms of Service"
                                    to="/terms-of-service"
                                    target="_blank"
                                >
                                    Terms of Service
                                </Link>
                                <span className="dot" />
                                <Link
                                    className="di mh2 fw4"
                                    style={{ fontSize: ".875rem", color: "#576c77" }}
                                    title="Privacy Policy"
                                    to="/privacy-policy"
                                    target="_blank"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
