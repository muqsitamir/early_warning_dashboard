import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectFilters } from "../filters/filterSlice";
import { showLoadingScreen, setSnackBar } from "../../reusable_components/site_data/siteDataSlice";
import { convert_to_request_parameters } from "../../reusable_components/utilityfunctions";
import {backend_url} from "../../App";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
  },
  reducers: {
    setEvents: (state, action) => {
      state.events.count = action.payload.count;
      state.events.next = action.payload.next;
      state.events.previous = action.payload.previous;
      state.events.results = action.payload.filterApplied ? action.payload.results : state.events.results.concat(action.payload.results);
    },
    resetEvents: (state) => {
      state.events = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
    },
  },
});

const Header = {};
export const getEvents =
  (page, filterApplied, status = null, rowsPerPage = 10) =>
  (dispatch, getState) => {
    dispatch(showLoadingScreen(true));
    Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
    let config = {
      headers: Header,
    };
    const filters = selectFilters(getState());
    let result = convert_to_request_parameters(filters.range, filters.startTime, filters.endTime);
    let cameras_selected = filters.cameras.join(",");
    let species_selected = filters.species.join(",");
    let eventStatus = status ? `&status=${status}` : "";
    axios
      .get(
        `${backend_url}/core/api/event/?datetime_after=${result.start}&datetime_before=${result.end}&cameras=${cameras_selected}&species=${species_selected}&page=${page}&page_size=${rowsPerPage}${eventStatus}`,
        config
      )
      .then((res) => {
        res.data["filterApplied"] = filterApplied;
        dispatch(setEvents(res.data));
      })
      .catch((err) => {
        dispatch(setSnackBar(err.response.data.non_field_errors[0]));
      })
      .finally(() => {
        dispatch(showLoadingScreen(false));
      });
  };

export const updateEventStatus = (eventIds, action) => (dispatch, getState) => {
  dispatch(showLoadingScreen(true));
  Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
  let config = {
    headers: Header,
  };

  const data = {
    archived: action === "archive" ? eventIds : [],
    featured: action === "feature" ? eventIds : [],
    restore: action === "restore" ? eventIds : [],
  };

  axios
    .post(`${backend_url}/core/api/event/batch_update/`, data, config)
    .then((res) => {
      dispatch(setSnackBar("Event status updated successfully"));
    })
    .catch((err) => {
      dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    })
    .finally(() => {
      dispatch(showLoadingScreen(false));
    });
};

export const deleteEvent = (eventIds) => (dispatch, getState) => {
  dispatch(showLoadingScreen(true));
  Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
  let config = {
    headers: Header,
  };

  const data = {
    events: eventIds,
  };

  axios
    .post(`${backend_url}/core/api/event/delete_events/`, data, config)
    .then((res) => {
      dispatch(setSnackBar("Event deleted successfully"));
    })
    .catch((err) => {
      dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    })
    .finally(() => {
      dispatch(showLoadingScreen(false));
    });
};

export const annotateEvents = (eventIds, annotations) => (dispatch, getState) => {
  dispatch(showLoadingScreen(true));
  Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
  let config = {
    headers: Header,
  };

  const data = {
    events: eventIds,
    species: annotations,
  };

  axios
    .post(`${backend_url}/core/api/event/annotate_species/`, data, config)
    .then((res) => {
      dispatch(setSnackBar("Event(s) annotated successfully"));
    })
    .catch((err) => {
      dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    })
    .finally(() => {
      dispatch(showLoadingScreen(false));
    });
};

export const removeAnnotations = (eventIds, annotations) => (dispatch, getState) => {
  dispatch(showLoadingScreen(true));
  Header["Authorization"] = `Token ${localStorage.getItem("token")}`;
  let config = {
    headers: Header,
  };

  const data = {
    events: eventIds,
    species: annotations,
  };

  axios
    .post(`${backend_url}/core/api/event/remove_species/`, data, config)
    .then((res) => {
      dispatch(setSnackBar("Annotation(s) removed successfully"));
    })
    .catch((err) => {
      dispatch(setSnackBar(err.response.data.non_field_errors[0]));
    })
    .finally(() => {
      dispatch(showLoadingScreen(false));
    });
};

// Action creators are generated for each case reducer function
export const { setEvents, resetEvents } = eventsSlice.actions;
export const selectEvents = (state) => state.events.events;
export default eventsSlice.reducer;
