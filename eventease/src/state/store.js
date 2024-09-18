import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../redux/sidebar';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export default store;
