import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiCall";
import moment from "moment";

import images from "../media/images";

const slice = createSlice({
  name: "satellites",
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
      window.location = "/page-not-found";
    },
    specificSatelliteRequested: (satellites, action) => {
      satellites.loading = true;
    },

    specificSatelliteReceived: (satellites, action) => {
      satellites.specificSatellite.data = action.payload;
      satellites.loading = false;
      satellites.specificSatellite.lastFetch = Date.now();
    },

    specificSatelliteRequestFailed: (satellites, action) => {
      satellites.loading = false;
      window.location = "/page-not-found";
    },

    loadPageStarted: (satellites, action) => {
      satellites.loading = true;
    },
    loadPageEnded: (satellites, action) => {
      satellites.loading = false;
    },
  },
});

const {
  satellitesRequested,
  satellitesReceived,
  satellitesRequestFailed,
  specificSatelliteRequested,
  specificSatelliteReceived,
  specificSatelliteRequestFailed,
  loadPageEnded,
} = slice.actions;

export default slice.reducer;

const url = "?payload_type=Satellite";

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

// param = payload_id

export const loadSpecificSatellite = (payloadId) => (dispatch, getState) => {
  const { lastFetch, data } = getState().satellites.specificSatellite;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  const payloadIdInCache = data.payload_id;

  if (diffInMinutes < 30 && payloadIdInCache === payloadId) return;

  return dispatch(
    apiCallBegan({
      url: `/${payloadId}`,
      onStart: specificSatelliteRequested.type,
      onSuccess: specificSatelliteReceived.type,
      onError: specificSatelliteRequestFailed.type,
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
  (state) => state.satellites.images,
  (images) => images
);

export const getRandomSatelliteImage = createSelector(
  (state) => state.satellites.images,
  (images) => {
    let randomNum = Math.floor(Math.random() * 10 + 1);
    return images[randomNum];
  }
);

export const endPageloading = (dispatch) => dispatch(loadPageEnded());

export const getLoadingStatus = createSelector(
  (state) => state.satellites,
  (satellites) => satellites.loading
);
