import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiCall";
import moment from "moment";

const slice = createSlice({
  name: "satellites",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    specificSatellite: {
      data: [],
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

export const getSatelliteManufacturers = createSelector(
  (state) => state.satellites,
  (satellites) => [
    ...new Set(satellites.list.map((satellite) => satellite.manufacturer)),
  ]
);
