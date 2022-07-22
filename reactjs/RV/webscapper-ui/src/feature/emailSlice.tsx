import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { invokeGetExistingEmail } from "../services/crawlerService";

export interface EmailState {
    emailaddress : string[]
  }
  
  const initialState: EmailState = {
    emailaddress:[]
  }


export const getExistingEmail = createAsyncThunk<
    // Return type of the payload creator
    string[],
    // First argument to the payload creator
    number,
    {

    }
>(
    'email/existingEmail',
    async (payload: number, thunkAPI) => {
        const response = await invokeGetExistingEmail(payload);
        return response.status;
    }
)

export const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
        }

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getExistingEmail.fulfilled, (state, action) => {
            // Add user to the state array
            state.emailaddress = [...action.payload];
        })
           
    },
})

export default emailSlice.reducer;
export const existingCampgroundEmail = (state : any) => state.email.emailaddress;