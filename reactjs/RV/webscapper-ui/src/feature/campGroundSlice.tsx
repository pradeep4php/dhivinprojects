import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import CrawlerRequest from "../model/requestPayload"
import { CampGroundSearchResponse } from "../model/responsePayload"
import { invokeSearch } from "../services/crawlerService"


export interface CamGroundState {
    id: number,
    name: string,
    website: string,
    address : string
  }
  
  const initialState: CamGroundState = {
    id: 0,
    name:'',
    website: '', 
    address:''
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
        })
       
      },
  })

  
  export const currentCampGround = (state : any) => state.campGround;
  export default campGroundSlice.reducer;
  
  