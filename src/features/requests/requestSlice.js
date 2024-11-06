import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setSnackBar, showLoadingScreen } from '../../reusable_components/site_data/siteDataSlice';
import { backend_url } from '../../App';   

export const requestSlice = createSlice({
    name: 'request',
    initialState: {
      request: {
        results:[],
        count:0
      }, // Use an array for requests
    },
    reducers: {
      setRequests: (state, action) => {
        state.request.results = action.payload.results; // Assuming payload is an array of requests
        state.request.count=action.payload.count;
      },
      
    },
  });

// Action creators
const Header = {};
// Thunk to fetch all requests
export const getRequests = (eventId) => async (dispatch) => {
  try {
    dispatch(showLoadingScreen(true));
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = await axios.get(`${backend_url}/core/api/request/`, config);
    dispatch(setRequests(response.data)); // Dispatch to set requests in the state
  } catch (error) {
    console.error('Error fetching requests:', error);
    dispatch(setSnackBar(error.message)); // Display error message
  } finally {
    dispatch(showLoadingScreen(false));
  }
};

// Thunk to create a new request
export const createRequest = (requestData) => async (dispatch) => {
  try {
    dispatch(showLoadingScreen(true));
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = await axios.post(`${backend_url}/core/api/request/`, requestData, config);
    dispatch(addRequest(response.data)); // Dispatch to add the new request
  } catch (error) {
    console.error('Error creating request:', error);
    dispatch(setSnackBar(error.message)); // Display error message
  } finally {
    dispatch(showLoadingScreen(false));
  }
};

// Thunk to update a request by UUID
export const updateRequestById = (uuid, updatedData) => async (dispatch) => {
  try {
    dispatch(showLoadingScreen(true));
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = await axios.put(`${backend_url}/core/api/request/${uuid}/`, updatedData, config);
    dispatch(updateRequest(response.data)); // Dispatch to update the request
  } catch (error) {
    console.error('Error updating request:', error);
    dispatch(setSnackBar(error.message)); // Display error message
  } finally {
    dispatch(showLoadingScreen(false));
  }
};

// Thunk to delete a request by UUID
export const deleteRequestById = (uuid) => async (dispatch) => {
  try {
    dispatch(showLoadingScreen(true));
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    await axios.delete(`${backend_url}/core/api/request/${uuid}/`, config);
    dispatch(deleteRequest(uuid)); // Dispatch to remove the deleted request
  } catch (error) {
    console.error('Error deleting request:', error);
    dispatch(setSnackBar(error.message)); // Display error message
  } finally {
    dispatch(showLoadingScreen(false));
  }
};

// Selector to get all requests
// Assuming you're using Redux Toolkit
// Selector to get all requests
export const { setRequests, addRequest, updateRequest, deleteRequest, setError, clearError } = requestSlice.actions;

export const selectRequests = (state) => state.request.request; // Ensure this path matches your slice name

// Default export
export default requestSlice.reducer; 
