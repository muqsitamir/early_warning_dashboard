import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filterApplied: false,
    range: {
      startDate: null,
      endDate: new Date(),
      key: 'range'
    },
    cameras: [],
    species: []
  },
  reducers: {
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
export const { setDateRange, setCameras, setSpecies, setFilterApplied } = filterSlice.actions
export const selectFilters = (state) => state.filters;


export default filterSlice.reducer

