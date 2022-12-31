import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import {setSnackBar, showLoadingScreen} from "../../reusable_components/site_data/siteDataSlice";
import {backend_url} from "../../App";


export const pieChartSlice = createSlice({
  name: 'pie_chart',
  initialState: {
      pie_chart: {
          labels: [],
          datasets: [

          ]
      }
  },
  reducers: {
      setPieChart: (state, action) => {
          state.pie_chart = {
            labels: action.payload.labels,
            datasets: [
                {
                    data: action.payload.data,
                    backgroundColor: action.payload.colors,
                    borderWidth: 1,
                },
            ]
          }
      },
  },
})

const Header = {};

export const getPieChart = (start_date, end_date) => dispatch => {
    dispatch(showLoadingScreen(true));
    Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
    dispatch(showLoadingScreen(true));
    let config = {
        headers: Header,
    };
    axios.get(`${backend_url}/core/api/box/piechart/?image__date__gte=${start_date}&image__date__lte=${end_date}`, config).then(res => {
        dispatch(setPieChart(res.data));
    }).catch(err => {
        dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    }).finally(() => {
        dispatch(showLoadingScreen(false));
    });
};


// Action creators are generated for each case reducer function
export const { setPieChart } = pieChartSlice.actions
export const selectPieChart = (state) => state.pie_chart;
export default pieChartSlice.reducer

