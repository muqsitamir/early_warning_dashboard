import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {setSnackBar, showLoadingScreen} from "../../reusable_components/site_data/siteDataSlice";
import {backend_url} from "../../App";


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
    dispatch(showLoadingScreen(true));
    Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
    dispatch(showLoadingScreen(true));
    let config = {
        headers: Header,
    };
    axios.get(`${backend_url}/core/api/box/linechart/?image__date__gte=${start_date}&image__date__lte=${end_date}`, config).then(res => {
        dispatch(setLineChart(res.data));

    }).catch(err => {
        debugger;
        dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    }).finally(() => {
        dispatch(showLoadingScreen(false));
    });
};


// Action creators are generated for each case reducer function
export const { setLineChart } = lineChartSlice.actions;
export const selectLineChart = (state) => state.line_chart;
export default lineChartSlice.reducer;
