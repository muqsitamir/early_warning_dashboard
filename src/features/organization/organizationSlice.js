import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";


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
    Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
    let config = {
        headers: Header,
    };
    axios.get('https://tpilums.org.pk/core/api/organization/', config).then((res) => {
        dispatch(setOrganization(res.data));
    }).catch((err) => {

    }).finally(() => {

    })
}



// Action creators are generated for each case reducer function
export const { setOrganization } = organizationSlice.actions
export const selectOrganization = (state) => state.organization.organization;
export default organizationSlice.reducer

