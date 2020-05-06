import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiCall";
import moment from "moment";

const slice = createSlice({
  name: "satellites",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    satellitesRequested: (satellites, action) => {
      satellites.loading = true;
    },

    satellitesReceived: (satellites, action) => {
      satellites.list = action.payload;
      satellites.loading = false;
      satellites.lastFetch = Date.now();
    },

    satellitesRequestFailed: (satellites, action) => {
      satellites.loading = false;
    },
  },
});

const {
  satellitesRequested,
  satellitesReceived,
  satellitesRequestFailed,
} = slice.actions;

export default slice.reducer;

const url = "?payload_type=Satellite";
const unknown = null || undefined;

export const loadSatellites = () => (dispatch, getState) => {
  const { lastFetch } = getState().satellites;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 30) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: satellitesRequested.type,
      onSuccess: satellitesReceived.type,
      onError: satellitesRequestFailed.type,
    })
  );
};

export const getSatellites = createSelector(
  (state) => state.satellites,
  (satellites) => satellites.list.filter((satellite) => satellite.manufacturer)
);

export const getSatellitesManufacturers = createSelector(
  (state) => state.satellites,
  (satellites) => [
    ...new Set(satellites.list.map((satellite) => satellite.manufacturer)),
  ]
);
