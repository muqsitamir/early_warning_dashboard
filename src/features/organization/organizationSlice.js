import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import {setSnackBar, showLoadingScreen} from "../../reusable_components/site_data/siteDataSlice";


export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
      organization: {
          cameras: [],
          species: []
      },
  },
  reducers: {
      setOrganization: (state, action) => {
          state.organization = action.payload
      },
  },
})

const Header = {};
export const getOrganization = () => dispatch => {
    dispatch(showLoadingScreen(true));
    Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
    let config = {
        headers: Header,
    };
    axios.get('https://api.tpilums.org.pk/core/api/organization/', config).then((res) => {
        dispatch(setOrganization(res.data));
    }).catch((err) => {
        dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    }).finally(() => {
        dispatch(showLoadingScreen(false));
    })
}



// Action creators are generated for each case reducer function
export const { setOrganization } = organizationSlice.actions
export const selectOrganization = (state) => state.organization.organization;
export default organizationSlice.reducer

