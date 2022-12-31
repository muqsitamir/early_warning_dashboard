import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import {showLoadingScreen, setSnackBar} from "../../reusable_components/site_data/siteDataSlice";
import {backend_url} from "../../App";




export const cameraSlice = createSlice({
  name: 'cameras',
  initialState: {
      cameras: {
          "count": 0,
          "next": null,
          "previous": null,
          "results": []
      },
  },
  reducers: {
      setCameras: (state, action) => {
          state.cameras.count = action.payload.count;
          state.cameras.next = action.payload.next;
          state.cameras.previous = action.payload.previous;
          state.cameras.results = action.payload.results;
      },
  },
})

const Header = {};
export const getCameras = () => (dispatch, getState) => {
    dispatch(showLoadingScreen(true));
    Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
    let config = {
        headers: Header,
    };
    axios.get(`${backend_url}/core/api/camera/`, config).then((res) => {
        dispatch(setCameras(res.data));
    }).catch((err) => {
        dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    }).finally(() => {
        dispatch(showLoadingScreen(false));
    })
}


// Action creators are generated for each case reducer function
export const { setCameras } = cameraSlice.actions
export const selectCameras = (state) => state.cameras.cameras;
export default cameraSlice.reducer

