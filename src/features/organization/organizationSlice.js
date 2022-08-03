import { createSlice } from '@reduxjs/toolkit'


export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    range: {
      startDate: null,
      endDate: new Date(),
      key: 'range'
    },
    cameras: [],
    species: []
  },
  reducers: {
      setDateRange: (state, action) => {
          state.range = action.payload.range
      },
  },
})

// Action creators are generated for each case reducer function
export const { setDateRange } = filterSlice.actions
export const selectFilters = (state) => state.filters;


export default filterSlice.reducer

