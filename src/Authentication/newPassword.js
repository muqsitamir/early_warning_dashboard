// import React from 'react';
// import {Link} from 'react-router-dom';
// import Form from "../../reuseable-components/form";
// import Joi from 'joi-browser';
// import Textfield from "../../reuseable-components/textfield";
//
//
// class NewPassword extends Form {
//     state = {
//         isHidden: true,
//         data: {new_password: "", re_new_password: ""},
//         errors: {}
//     };
//     schema = {
//         new_password: Joi.string().required().min(8).error(errors => {
//             return errors.map(error => {
//                 switch (error.type) {
//                     case "string.min":
//                         return {message: "Your password must contain 8 characters"};
//                     case "any.empty":
//                         return {message: "New password is required"};
//                 }
//             })
//         }),
//         re_new_password: Joi.any().valid(Joi.ref('new_password')).required().error(errors => {
//             return errors.map(error => {
//                 switch (error.type) {
//                     // case "any.allowOnly":
//                     //   return {message: "Confirm password must match New password"};
//                     case "any.empty":
//                         return {message: "Confirm password is required"};
//
//                 }
//             })
//         })
//     };
//
//     doSubmit = event => {
//         event.preventDefault();
//         const new_password = this.state.data.new_password
//         const re_new_password = this.state.data.re_new_password
//         const token = this.props.match.params.token;
//         // this.props.newPassword(token, new_password, re_new_password, this.props)
//     };
//
//
//     changeHidden = (event) => {
//         event.preventDefault()
//         this.setState({isHidden: !this.state.isHidden})
//     }
//
//     handleReNewPassword = ({currentTarget: input}) => {
//         const errors = {...this.state.errors};
//         if (input.value !== null && input.value !== "") {
//             if (input.value !== this.state.data.new_password) {
//                 errors['re_new_password'] = "Verify password must match New Password"
//             } else {
//                 errors['re_new_password'] = null
//             }
//         } else {
//             errors['re_new_password'] = "Verify New Password is required"
//         }
//         const data = {...this.state.data};
//         data[input.name] = input.value;
//         this.setState({data, errors})
//     };
//
//
//     render() {
//         // if (this.props.message) {
//         //     return <MessageSnackbar message="Your Password Has Been Changed Successfully"/>
//         // }
//         const {isHidden} = this.state;
//         return (
//             <div>
//
//                 <div className="page">
//                     <div className="page__content">
//                         <div className="auth_master-form tc center">
//                             {/* */}
//
//                             {/* */}
//                             <div className="shadow-0 pa3 auth_page-auth">
//                                 <div className="mb4 mt3">
//                                     <h4>Reset your password</h4>
//                                 </div>
//                                 <div className="mb4 col">
//                                     <form className="form-register">
//                                         {/* */}
//                                         <Textfield name="new_password" label="New Password"
//                                                    type={isHidden ? 'password' : 'text'} onChange={this.handleChange}
//                                                    value={this.state.data.new_password}
//                                                    error={this.state.errors.new_password} onClick={this.onIconClick}
//                                                    changeHidden={this.changeHidden} isHidden={isHidden}
//                                                    autoFocus={true}/>
//                                         <Textfield name="re_new_password" label="Confirm New Password"
//                                                    value={this.state.data.re_new_password}
//                                                    type={isHidden ? 'password' : 'text'}
//                                                    onChange={this.handleReNewPassword}
//                                                    error={this.state.errors.re_new_password} onClick={this.onIconClick}
//                                                    changeHidden={this.changeHidden} isHidden={isHidden}/>
//
//                                         <div className="mv2 pt3">
//                                             <button className="btn btn-xl btn-primary btn-block text-white btn-shadow"
//                                                     type="submit">Change my password
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                             {/* */}
//                             <div className="mt4" style={{fontSize: '.875rem'}}>
//                                 <span>
//                                   <Link to="/login" className="link-mute">
//                                       <i className="material-icons-outlined v-mid mr1"
//                                          style={{
//                                              color: '#0258ff',
//                                              fontSize: '15px'
//                                          }}>arrow_back_ios</i>
//                                     <span>Back to Login</span>
//                                   </Link>
//                                 </span>
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
//             </div>
//
//         );
//     }
// }
//
// export default NewPassword;
