import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import {selectFilters} from "../filters/filterSlice";
import {showLoadingScreen, setSnackBar} from "../../reusable_components/site_data/siteDataSlice";




export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
      events: {
          "count": 0,
          "next": null,
          "previous": null,
          "results": []
      },
  },
  reducers: {
      setEvents: (state, action) => {
          state.events.count = action.payload.count;
          state.events.next = action.payload.next;
          state.events.previous = action.payload.previous;
          state.events.results = action.payload.filterApplied ? action.payload.results : state.events.results.concat(action.payload.results);
          },
  },
})

const Header = {};
export const getEvents= (page, filterApplied) => (dispatch, getState) => {
    dispatch(showLoadingScreen(true));
    Header['Authorization'] = `Token ${localStorage.getItem("token")}`;
    let config = {
        headers: Header,
    };
    const {range, cameras, species, startTime, endTime} = selectFilters(getState());
    let start_date = range.startDate ? range.startDate.getFullYear() + '-' + (range.startDate.getMonth() + 1) + '-' + range.startDate.getDate() : '';
    let start_ts = start_date == "" ? "" : "T" + startTime.getHours() + "%3A" + startTime.getMinutes() + "%3A" + startTime.getSeconds() ;
    let end_date = range.endDate.getFullYear() + '-' + (range.endDate.getMonth() + 1) + '-' + range.endDate.getDate();
    let end_ts =  "T" + endTime.getHours() + "%3A" + endTime.getMinutes() + "%3A" + endTime.getSeconds() ;
    let cameras_selected = cameras.join(',');
    let species_selected = species.join(',');
    axios.get(`http://127.0.0.1:8000/core/api/event/?datetime_after=${start_date}${start_ts}&datetime_before=${end_date}${end_ts}&cameras=${cameras_selected}&species=${species_selected}&page=${page}`, config).then((res) => {
        res.data["filterApplied"] = filterApplied;
        dispatch(setEvents(res.data));
    }).catch((err) => {
        dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    }).finally(() => {
        dispatch(showLoadingScreen(false));
    })
}



// Action creators are generated for each case reducer function
export const { setEvents } = eventsSlice.actions
export const selectEvents = (state) => state.events.events;
export default eventsSlice.reducer

