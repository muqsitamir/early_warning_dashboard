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
    const {range, cameras, species} = selectFilters(getState());
    let start_date = range.startDate ? range.startDate.getFullYear() + '-' + (range.startDate.getMonth() + 1) + '-' + range.startDate.getDate() : '';
    let end_date = range.endDate.getFullYear() + '-' + (range.endDate.getMonth() + 1) + '-' + range.endDate.getDate();
    let cameras_selected = cameras.join(',');
    let species_selected = species.join(',');
    axios.get(`https://tpilums.org.pk/core/api/event/?date_gte=${start_date}&date_lte=${end_date}&cameras=${cameras_selected}&species=${species_selected}&page=${page}`, config).then((res) => {
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

