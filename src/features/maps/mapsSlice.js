import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";


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
    Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
    // dispatch(showLoadingScreen(true));
    let config = {
        headers: Header,
    };
    axios.get("https://tpilums.org.pk/core/api/camera/", config).then(res => {
        dispatch(setMaps(res.data));
    }).catch(err => {

    }).finally(() => {

    });
};


// Action creators are generated for each case reducer function
export const { setMaps } = mapsSlice.actions
export const selectMaps = (state) => state.maps.maps;
export default mapsSlice.reducer
