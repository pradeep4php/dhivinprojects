import { configureStore } from "@reduxjs/toolkit";
import draftEmailReducer from "../feature/draftEmailSlice";
import campGroundReducer from "../feature/campGroundSlice";

export const store = configureStore({
    reducer: {
        draftEmail : draftEmailReducer,
        campGround : campGroundReducer,
    },
  })

const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
)