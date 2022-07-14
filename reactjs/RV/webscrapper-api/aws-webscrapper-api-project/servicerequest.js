const {service_request} = require('./models');
const {DraftEmail,Email} = require('./models');

    module.exports.webScrapper = async(req)=>{
        //console.log(req+" In Service");
        try{
            const serviceRequest = await service_request.create({
                url : req,
                status : "new"
            });
            return serviceRequest.id;
        }
        catch(err){
            return err;
        }
    }

    module.exports.getCurrentStatus = async(req)=>{
        const id = req;
        try{
            const currentStatus = await service_request.findOne({
                where : {id}
            });
            if(currentStatus != null)
                return currentStatus.status;
            return "Current Status is unavailable";
        }
        catch(err){
            return err;
        }
    }

    module.exports.getDraftEmail = async(req)=>{
        const servicerequestid = req;
        console.log(servicerequestid)
        try{
            const emailList = await DraftEmail.findAll({
                where : {servicerequestid},
                attributes : ['emailaddress'],
                raw:true
            });
            return emailList.map(email=>email.emailaddress)
        }
        catch(err){
            return err;
        }
    }

    module.exports.insertEmail = async(req)=>{
        try{
            const email = await Email.create({
                email : req.email,
                campgroundid : req.campgroundid,
                donotemail : req.donotemail,
                isprimary : req.isprimary
            });
            return email.id;
        }
        catch(err){
            return err;
        }
    }
