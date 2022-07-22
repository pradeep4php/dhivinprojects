import axios, { AxiosResponse } from "axios";
import env from "react-dotenv";
import CrawlerRequest from "../model/requestPayload";
import  { CrawlerResponse, CrawlerStatusResponse, DraftEmailResponse, ExistingEmailResponse } from "../model/responsePayload";


export async function invokeWebCrawler(payload:CrawlerRequest) : Promise<CrawlerResponse> {
    var {data} = await axios.post<AxiosResponse<CrawlerResponse>>(`${env.apiUrl}`, payload);
    return data as any;
}

export async function invokeGetStatus(requestID:number) {
    var {data} = await axios.get<AxiosResponse<CrawlerStatusResponse>>(`${env.apiUrl}status/${requestID}`);
    return data as any; 
}

export async function invokeSearch(name:string) {
    var {data} = await axios.get<AxiosResponse<CrawlerStatusResponse[]>>(`${env.apiUrl}campground/${name}`);
    return data as any;
}

export async function invokeGetDraftEmail(id:number) {
    var {data} = await axios.get<AxiosResponse<DraftEmailResponse>>(`${env.apiUrl}draftemail/${id}`);
    return data as any;
}


export async function invokeGetExistingEmail(id:number) {
    var {data} = await axios.get<AxiosResponse<ExistingEmailResponse>>(`${env.apiUrl}/existemail/${id}`);
    return data as any;
}