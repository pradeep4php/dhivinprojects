export interface CrawlerResponse {
    serviceRequestID : number
}

export interface CrawlerStatusResponse {
    serviceRequestID : number,
    status: string
}

export interface CampGroundSearchResponse {
    id : number,
    name: string,
    website: string
}

export interface DraftEmailResponse {
    serviceRequestID : number,
    emaillist: string[]
}