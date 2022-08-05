import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeleteEmailRequest } from "../model/requestPayload";
import { invokeDeleteEmail, invokeGetExistingEmail } from "../services/crawlerService";

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
        return response.existingEmail;
    }
)


export const deleteExistingEmail = createAsyncThunk<
    // Return type of the payload creator
    string,
    // First argument to the payload creator
    DeleteEmailRequest,
    {

    }
>(
    'email/deleteEmail',
    async (payload: DeleteEmailRequest, thunkAPI) => {
        const response = await invokeDeleteEmail(payload);
        return payload.email;
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
            if(Array.isArray(action.payload))
                state.emailaddress = [...action.payload];
        }).addCase(deleteExistingEmail.fulfilled, (state, action) => {
            // Add user to the state array
                var emailTempList = [...state.emailaddress];
                var removeIndex = emailTempList.indexOf(action.payload);
                emailTempList.splice(removeIndex, 1);
                state.emailaddress = [...emailTempList];
        })
           
    },
})

export default emailSlice.reducer;
export const existingCampgroundEmail = (state : any) => state.email.emailaddress;