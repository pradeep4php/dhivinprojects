import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {CrawlerRequest,  CampGroundEmailRequest } from "../model/requestPayload"
import { CampGroundSearchResponse } from "../model/responsePayload"
import { invokeAddEmail, invokeSearch } from "../services/crawlerService"


export interface CamGroundState {
    id: number,
    name: string,
    website: string,
    address : string,
    city : string,
    country : string
  }
  
  const initialState: CamGroundState = {
    id: 0,
    name:'',
    website: '', 
    address:'',
    city : '',
    country : ''
  }

  

  export const searchCampGround = createAsyncThunk<
  // Return type of the payload creator
  CampGroundSearchResponse,
  // First argument to the payload creator
  string,
  {
   
  }
>(
    'campGround/search',
    async (payload: string, thunkAPI) => {
        const response = await invokeSearch(payload);
        return response.campGrounds.length > 0 ? response.campGrounds[0] : {};
    }
  )

  export const addEmailAddress = createAsyncThunk<
  // Return type of the payload creator
  string,
  // First argument to the payload creator
  CampGroundEmailRequest[],
  {
   
  }
>(
    'campGround/addEmail',
    async (payload: CampGroundEmailRequest[], thunkAPI) => {
        const response = await invokeAddEmail(payload);
        return response;
    }
  )
  
  export const campGroundSlice = createSlice({
    name: 'campGround',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(searchCampGround.fulfilled, (state, action : any) => {
          // Add user to the state array
          state.id = action.payload.id;
          state.website = action.payload.website;
          state.name = action.payload.name;
          state.country = action.payload.country;
          state.city = action.payload.city;
        })
       
      },
  })

  
  export const currentCampGround = (state : any) => state.campGround;
  export default campGroundSlice.reducer;
  
  