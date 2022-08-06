import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filters/filterSlice';
import organizationReducer from '../features/organization/organizationSlice';
import eventsReducer from '../features/events/eventsSlice'
import pieChartReducer from '../features/piechart/pieChartSlice'
import lineChartReducer from '../features/linechart/lineChartSlice'
import mapsReducer from '../features/maps/mapsSlice'
import userReducer from '../pages/Authentication/userSlice'

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    organization: organizationReducer,
    events: eventsReducer,
    pie_chart: pieChartReducer,
    line_chart: lineChartReducer,
    maps: mapsReducer,
    user: userReducer,
  },
});
