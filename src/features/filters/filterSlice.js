import { createSlice } from '@reduxjs/toolkit'
import dateRange from "react-date-range/dist/components/DateRange";

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filterApplied: false,
    range: {
      startDate: null,
      endDate: new Date(),
      key: 'range'
    },
    startTime: new Date(),
    endTime: new Date(),
    cameras: [],
    species: []
  },
  reducers: {
      setTimeRange: (state, action) => {
          debugger;

          state.startTime = action.payload.startTime;
          state.endTime = action.payload.endTime;
          debugger;
      },
      setFilterApplied: (state, action) => {
          state.filterApplied = action.payload
      },
      setDateRange: (state, action) => {
          state.range = action.payload
      },
      setCameras: (state, action) => {
          state.cameras = action.payload
      },
      setSpecies: (state, action) => {
          state.species = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setDateRange, setCameras, setSpecies, setFilterApplied, setTimeRange } = filterSlice.actions
export const selectFilters = (state) => state.filters;


export default filterSlice.reducer

