// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./features/peopleSlice";
const store = configureStore({
  reducer: {
    people: peopleReducer,
    // Add other reducers here if needed
  },
});

export default store;
