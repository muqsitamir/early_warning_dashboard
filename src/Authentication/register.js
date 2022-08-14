// import React from "react";
// import Form from "../../reuseable-components/form";
// import {Link} from "react-router-dom";
// import Textfield from "../../reuseable-components/textfield";
// import Joi from 'joi-browser';
//
// class Register extends Form {
//     state = {
//         isHidden: true,
//         data: {
//             email: "",
//             password: "",
//             first_name: "",
//             last_name: "",
//             confirm_password: "",
//             username: ""
//         },
//         errors: {}
//     };
//
//     schema = {
//         email: Joi.string().required().email().error(errors => {
//             return errors.map(error => {
//                 switch (error.type) {
//                     case "string.email":
//                         return {message: "Enter a valid email"};
//                     case "any.empty":
//                         return {message: "Email is required"};
//                 }
//             })
//         }),
//         password: Joi.string().required().min(8).error(errors => {
//             return errors.map(error => {
//                 switch (error.type) {
//                     case "string.min":
//                         return {message: "Your password must contain 8 characters"};
//                     case "any.empty":
//                         return {message: "Password is required"};
//                 }
//             })
//         }),
//         confirm_password: Joi.any().valid(Joi.ref('password')).required().error(errors => {
//             return errors.map(error => {
//                 switch (error.type) {
//                     case "any.allowOnly":
//                         return {message: "Confirm password must match password"};
//                     case "any.empty":
//                         return {message: "Confirm password is required"};
//                 }
//             })
//         }),
//         first_name: Joi.string().required().error(errors => {
//             return errors.map(error => {
//                 switch (error.type) {
//                     case "any.empty":
//                         return {message: "First Name is required"};
//                 }
//             })
//         }),
//         last_name: Joi.string().required().error(errors => {
//             return errors.map(error => {
//                 switch (error.type) {
//                     case "any.empty":
//                         return {message: "Last Name is required"};
//                 }
//             })
//         }),
//         username: Joi.string().required().error(errors => {
//             return errors.map(error => {
//                 switch (error.type) {
//                     case "any.empty":
//                         return {message: "Username is required"};
//                 }
//             })
//         })
//     };
//
//     handleReNewPassword = ({currentTarget: input}) => {
//         const errors = {...this.state.errors};
//         if (input.value !== null && input.value !== "") {
//             if (input.value !== this.state.data.password) {
//                 errors['confirm_password'] = "Confirm password must match Password"
//             } else {
//                 errors['confirm_password'] = null
//             }
//         } else {
//             errors['confirm_password'] = "Confirm Password is required"
//         }
//         const data = {...this.state.data};
//         data[input.name] = input.value;
//         this.setState({data, errors})
//     };
//
//     render() {
//         return (
//             <div>
//                 <div className="page ap-skin-blue">
//                     <div className="page__content">
//                         <div className="auth_master-form tc center">
//                             {/* */}
//                             <div className="shadow-0 pa3 auth_page-auth">
//                                 <div className="mb4 mt3">
//                                     <h3>Create Your Free Account</h3>
//                                 </div>
//
//                                 <div className="mb4 col">
//                                     <form className="form-register">
//                                         {/* */}
//                                         <div className="row" style={{marginBottom: 0}}>
//                                             <div className="col s6">
//                                                 <Textfield
//                                                     value={this.state.data.first_name}
//                                                     label="First Name"
//                                                     name="first_name"
//                                                     type="text"
//                                                     onChange={this.handleChange}
//                                                     error={this.state.errors.first_name}
//                                                     autoFocus={true}/>
//                                             </div>
//                                             <div className="col s6">
//                                                 <Textfield
//                                                     value={this.state.data.last_name}
//                                                     name="last_name"
//                                                     label="Last Name"
//                                                     type="text"
//                                                     onChange={this.handleChange}
//                                                     error={this.state.errors.last_name}/>
//                                             </div>
//                                         </div>
//                                         {/* */}
//
//                                         <Textfield
//                                             value={this.state.data.email}
//                                             name="email"
//                                             label="Email"
//                                             type="email"
//                                             onChange={this.handleChange}
//                                             error={this.state.errors.email}/>
//                                         {/* */}
//
//                                         <Textfield
//                                             value={this.state.data.username}
//                                             name="username"
//                                             label="Username "
//                                             type="text"
//                                             onChange={this.handleChange}
//                                             error={this.state.errors.username}/>
//                                         {/* */}
//
//                                         <Textfield
//                                             value={this.state.data.password}
//                                             name="password"
//                                             label="Password"
//                                             type={this.state.isHidden ? 'password' : 'text'}
//                                             onChange={this.handleChange}
//                                             error={this.state.errors.password}
//                                             onClick={this.onIconClick}
//                                             isHidden={this.state.isHidden}
//                                             changeHidden={this.changeHidden}
//                                         />
//
//                                         {/* */}
//                                         <Textfield
//                                             value={this.state.data.confirm_password}
//                                             name="confirm_password"
//                                             label="Confirm Password"
//                                             type={this.state.isHidden ? 'password' : 'text'}
//                                             onChange={this.handleReNewPassword}
//                                             error={this.state.errors.confirm_password}
//                                             onClick={this.onIconClick}
//                                             isHidden={this.state.isHidden}
//                                             changeHidden={this.changeHidden}
//                                         />
//
//                                         <div className="mv1">
//                                             <p style={{fontSize: '.875rem'}}>By signing up, you agree to our <Link
//                                                 title="Terms of Service" to="/terms-of-service"
//                                                 target="_blank">Terms &amp; Conditions</Link></p>
//                                         </div>
//                                         {/* */}
//                                         <div className="mv2 pt3">
//                                             <button className="btn btn-xl btn-primary btn-block text-white btn-shadow"
//                                                     onClick={this.handleSubmit}>
//                                                 CREATE ACCOUNT
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                             {/* */}
//                             <div className="mv2" style={{fontSize: '.875rem'}}>
//                                 <p>Already have an account?
//                                     <Link title="Sign up" to="/login"> Login</Link></p>
//                             </div>
//                             {/* */}
//                             <div className="pv2 mb4">
//                                 <div className="flex items-center justify-center">
//                                     ©
//                                     <span className="mr2" style={{fontSize: '.875rem'}}>2021</span>
//                                     <span className="dot"/>
//                                     <Link className="di mh2 fw4" style={{fontSize: '.875rem', color: '#576c77'}}
//                                           title="Terms of Service" to="/terms-of-service" target="_blank">Terms of
//                                         Service</Link>
//                                     <span className="dot"/>
//                                     <Link className="di mh2 fw4" style={{fontSize: '.875rem', color: '#576c77'}}
//                                           title="Terms of Service" to="/privacy-policy" target="_blank">Privacy
//                                         Policy</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//
//             </div>
//         );
//     }
// }
//
// export default Register;