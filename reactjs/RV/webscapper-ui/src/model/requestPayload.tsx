export  interface CrawlerRequest {
    url : string
}

export  interface CampGroundEmailRequest {
    email : string,
    isprimary : number,
    donotemail : number,
    campgroundid : number,
}

export  interface DeleteEmailRequest {
    email : string,
    campgroundid : number,
}