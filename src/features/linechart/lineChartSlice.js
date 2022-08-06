import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";


export const lineChartSlice = createSlice({
  name: 'line_chart',
  initialState: {
      line_chart: {
          labels: [],
          datasets: [

          ]
      }
  },
  reducers: {
      setLineChart: (state, action) => {
          state.line_chart = {
            labels: action.payload.labels,
            datasets: action.payload.datasets
          }
      },
  },
})

const Header = {};

export const getLineChart = (start_date, end_date) => dispatch => {
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
        dispatch(setLineChart(res.data));
    }).catch(err => {

    }).finally(() => {

    });
};


// Action creators are generated for each case reducer function
export const { setLineChart } = lineChartSlice.actions;
export const selectLineChart = (state) => state.line_chart;
export default lineChartSlice.reducer;
