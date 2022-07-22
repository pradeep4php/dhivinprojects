import { configureStore } from "@reduxjs/toolkit";
import draftEmailReducer from "../feature/draftEmailSlice";
import campGroundReducer from "../feature/campGroundSlice";
import emailReducer from "../feature/emailSlice";

export const store = configureStore({
    reducer: {
        draftEmail : draftEmailReducer,
        campGround : campGroundReducer,
        email : emailReducer
    },
  })

const unsubscribe = store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
)