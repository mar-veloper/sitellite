import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiCall";
import moment from "moment";

import images from "../media/images";

const slice = createSlice({
  name: "@satellites",
  initialState: {
    list: [],
    loading: true,
    lastFetch: null,
    images: { ...images },
    specificSatellite: {
      data: {},
      lastFetch: null,
    },
  },
  reducers: {
    SATELLITES_REQUESTED: (satellites, action) => {
      satellites.loading = true;
    },

    SATELLITES_RECEIVED: (satellites, action) => {
      satellites.list = action.payload;
      satellites.loading = false;
      satellites.lastFetch = Date.now();
    },

    SATELLITES_REQUEST_FAILED: (satellites, action) => {
      satellites.loading = false;
      window.location = "/page-not-found";
    },
    SPECIFIC_SATELLITE_REQUESTED: (satellites, action) => {
      satellites.loading = true;
    },

    SPECIFIC_SATELLITE_RECEIVED: (satellites, action) => {
      satellites.specificSatellite.data = action.payload;
      satellites.loading = false;
      satellites.specificSatellite.lastFetch = Date.now();
    },

    SPECIFIC_SATELLITE_REQUEST_FAILED: (satellites, action) => {
      satellites.loading = false;
      window.location = "/page-not-found";
    },

    LOAD_PAGE_STARTED: (satellites, action) => {
      satellites.loading = true;
    },
    LOAD_PAGE_ENDED: (satellites, action) => {
      satellites.loading = false;
    },
  },
});

const {
  SATELLITES_REQUESTED,
  SATELLITES_RECEIVED,
  SATELLITES_REQUEST_FAILED,
  SPECIFIC_SATELLITE_REQUESTED,
  SPECIFIC_SATELLITE_RECEIVED,
  SPECIFIC_SATELLITE_REQUEST_FAILED,
  LOAD_PAGE_ENDED,
} = slice.actions;

export default slice.reducer;

const url = "?payload_type=Satellite";

export const loadSatellites = () => (dispatch, getState) => {
  const { lastFetch } = getState().satellites;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 30) return;

  return dispatch(
    apiCallBegan({
      // see, here would a been better to see API_CALL_BEGAN
      url,
      onStart: SATELLITES_REQUESTED.type,
      onSuccess: SATELLITES_RECEIVED.type,
      onError: SATELLITES_REQUEST_FAILED.type,
    })
  );
};

// param = payload_id

export const loadSpecificSatellite = (payloadId) => (dispatch, getState) => {
  const { lastFetch, data } = getState().satellites.specificSatellite;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  const payloadIdInCache = data.payload_id;

  if (diffInMinutes < 30 && payloadIdInCache === payloadId) return;

  return dispatch(
    apiCallBegan({
      url: `/${payloadId}`,
      onStart: SPECIFIC_SATELLITE_REQUESTED.type,
      onSuccess: SPECIFIC_SATELLITE_RECEIVED.type,
      onError: SPECIFIC_SATELLITE_REQUEST_FAILED.type,
    })
  );
};

export const getSatellites = createSelector(
  (state) => state.satellites,
  (satellites) => satellites.list.filter((satellite) => satellite.manufacturer)
);

export const getSpecificSatelliteData = createSelector(
  (state) => state.satellites.specificSatellite,
  (specificSatellite) => specificSatellite.data
);

export const getSatelliteManufacturers = createSelector(
  (state) => state.satellites,
  (satellites) => [
    ...new Set(satellites.list.map((satellite) => satellite.manufacturer)),
  ]
);

export const getSatellitesImages = createSelector(
  (state) => state.satellites,
  (satellites) => satellites.images
);

export const getRandomSatelliteImage = createSelector(
  (state) => state.satellites,
  (satellites) => {
    let randomNum = Math.floor(Math.random() * 10 + 1);
    return satellites.images[randomNum];
  }
);

export const endPageloading = (dispatch) => dispatch(LOAD_PAGE_ENDED());

export const getLoadingStatus = createSelector(
  (state) => state.satellites,
  (satellites) => satellites.loading
);
