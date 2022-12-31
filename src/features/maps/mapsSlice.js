import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {showLoadingScreen, setSnackBar} from "../../reusable_components/site_data/siteDataSlice";
import {backend_url} from "../../App";


export const mapsSlice = createSlice({
  name: 'maps',
  initialState: {
      maps:null
  },
  reducers: {
      setMaps: (state, action) => {
          state.maps = action.payload.results
      },
  },
})

const Header = {};

export const getCameraNodes = () => dispatch => {
    dispatch(showLoadingScreen(true));
    Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
    // dispatch(showLoadingScreen(true));
    let config = {
        headers: Header,
    };
    axios.get(`${backend_url}/core/api/camera/`, config).then(res => {
        dispatch(setMaps(res.data));
    }).catch(err => {
        dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    }).finally(() => {
        dispatch(showLoadingScreen(false));
    });
};


// Action creators are generated for each case reducer function
export const { setMaps } = mapsSlice.actions
export const selectMaps = (state) => state.maps.maps;
export default mapsSlice.reducer
