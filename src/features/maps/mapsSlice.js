import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";


export const mapSlice = createSlice({
  name: 'map',
  initialState: null,
  reducers: {
      setLineChart: (state, action) => {
          state.maps = action.payload.results
      },
  },
})

const Header = {};

export const getMaps = (start_date, end_date) => dispatch => {
    Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
    // dispatch(showLoadingScreen(true));
    let config = {
        headers: Header,
        params: {
            image__date__gte: start_date,
            image__date__lte: end_date,
        },
    };
    axios.get("https://tpilums.org.pk/core/api/box/linechart/", config).then(res => {
        debugger;
        dispatch(setLineChart(res.data));
    }).catch(err => {

    }).finally(() => {

    });
};


// Action creators are generated for each case reducer function
export const { setLineChart } = lineChartSlice.actions
export const selectLineChart = (state) => state.line_chart;
export default lineChartSlice.reducer
