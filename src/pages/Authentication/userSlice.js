import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";


export const userSlice = createSlice({
      name: 'user',
      initialState: {
        user: {
          email: null,
          id: null,
          username: null,
          first_name: null,
          last_name: null,
          is_staff: null,
          organization: null
        },
      },
      reducers: {
          setUserInfo: (state, action) => {
              state.user.email = action.payload.email;
              state.user.id = action.payload.id;
              state.user.username = action.payload.username;
              state.user.first_name = action.payload.first_name;
              state.user.last_name = action.payload.last_name;
              state.user.is_staff = action.payload.is_staff;
              state.user.organization = action.payload.organization;
          },
      },
})


export const login = (user, props) => dispatch => {
    // dispatch(showLoadingScreen(true))
    const Header = {};
    axios.post("https://tpilums.org.pk/accounts/api/token/login/", user, {headers: Header}).then(res => {
        localStorage.setItem("loginStatus", true)
        localStorage.setItem("token", res.data.auth_token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        const {state} = props.location;
        window.location = state ? state.from.pathname : "/userinfo"
    }).catch(err => {
        // dispatch({
        //     type: SNACKBAR,
        //     snackbar_show: true,
        //     snackbar_message: err.response.data.non_field_errors[0],
        // });
        // dispatch({
        //     type: LOGIN_STATUS,
        //     loginStatus: false
        // });
    }).finally(() => {
        // dispatch(showLoadingScreen(false))
    });


};

export const logout = () => dispatch => {
    localStorage.clear();
    window.location = '/login';
};


// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions;
export const selectUserInfo = (state) => state.user;
export default userSlice.reducer;