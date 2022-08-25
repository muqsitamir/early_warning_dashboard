import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import {selectFilters} from "../filters/filterSlice";
import {showLoadingScreen, setSnackBar} from "../../reusable_components/site_data/siteDataSlice";
import {convert_to_request_parameters} from "../../reusable_components/utilityfunctions";


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
    const filters = selectFilters(getState());
    let result = convert_to_request_parameters(filters.range, filters.startTime, filters.endTime)
    let cameras_selected = filters.cameras.join(',');
    let species_selected = filters.species.join(',');
    axios.get(`https://api.tpilums.org.pk/core/api/event/?datetime_after=${result.start}&datetime_before=${result.end}&cameras=${cameras_selected}&species=${species_selected}&page=${page}`, config).then((res) => {
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

