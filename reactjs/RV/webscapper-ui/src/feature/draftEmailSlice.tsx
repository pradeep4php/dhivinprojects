import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {CrawlerRequest }from "../model/requestPayload"
import { CrawlerResponse, CrawlerStatusResponse } from "../model/responsePayload"
import { invokeGetStatus, invokeWebCrawler ,invokeGetDraftEmail} from "../services/crawlerService"


export interface DraftEmailState {
    serviceID: number,
    url: string,
    status: string,
    emailaddress : string[]
  }
  
  const initialState: DraftEmailState = {
    serviceID: 0,
    url:'',
    status: '', // started, new, progress, complete
    emailaddress:[]
  }

  export const startWebCrawler = createAsyncThunk<
  // Return type of the payload creator
  number,
  // First argument to the payload creator
  CrawlerRequest,
  {
   
  }
>(
    'draftemail/startCrawler',
    async (payload: CrawlerRequest, thunkAPI) => {
        const response = await invokeWebCrawler(payload);
      return response.serviceRequestID;
    }
  )

  export const getStatus = createAsyncThunk<
  // Return type of the payload creator
  string,
  // First argument to the payload creator
  number,
  {
   
  }
>(
    'draftemail/status',
    async (payload: number, thunkAPI) => {
        const response = await invokeGetStatus(payload);
      return response.status;
    }
  )


  export const getDraftEmail = createAsyncThunk<
  // Return type of the payload creator
  string[],
  // First argument to the payload creator
  number,
  {
   
  }
>(
    'draftemail/email',
    async (payload: number, thunkAPI) => {
        const response = await invokeGetDraftEmail(payload);
      return response.emaillist;
    }
  )
  
  export const draftEmailSlice = createSlice({
    name: 'draftEmail',
    initialState,
    reducers: {
        reset : (state) => {
            state = initialState;
        } 
      
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(startWebCrawler.fulfilled, (state, action) => {
          // Add user to the state array
          state.serviceID = action.payload;
        })
        .addCase(startWebCrawler.pending,(state, action) =>{
            state.status = "started";
        })
        .addCase(getStatus.fulfilled,(state, action) =>{
            state.status = action.payload;
        })
        .addCase(getDraftEmail.fulfilled,(state, action) =>{
            state.emailaddress = [...action.payload];
        })
      },
  })

  export const currentServiceId = (state : any) => {
    return state.draftEmail.serviceID;
  }
 
  export const progressStatus = (state : any) => state.draftEmail.status;
  export const campGroundEmails = (state : any) => state.draftEmail.emailaddress;
  export const {reset} = draftEmailSlice.actions;
  export default draftEmailSlice.reducer;
  
  