import { createAction } from "@reduxjs/toolkit";

// change apiCallBegan to API_CALL_BEGAN... I would opt to use uppercase to name ACTIONS. this helps with readability when working with redux in large applications you will be abel to recognise what it is by scanning the page.
export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");
