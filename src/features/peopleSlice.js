// src/features/peopleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
  status: "idle",
  error: null,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    fetchPeoplePending: (state) => {
      state.status = "loading";
      console.log("Loading");
    },
    fetchPeopleFulfilled: (state, action) => {
      state.status = "succeeded";
      state.people = action.payload;
      console.log(action.payload);
    },
    fetchPeopleRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchPeoplePending, fetchPeopleFulfilled, fetchPeopleRejected } =
  peopleSlice.actions;

export const selectPeople = (state) => state.people.people;
export const selectPeopleStatus = (state) => state.people.status;
export const selectPeopleError = (state) => state.people.error;

export default peopleSlice.reducer;
