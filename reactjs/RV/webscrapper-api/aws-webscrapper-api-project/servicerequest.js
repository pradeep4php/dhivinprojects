const {service_request} = require('./models');
const {DraftEmail,Email,CampGround} = require('./models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
            return emailList.map(email=>email.emailaddress);
        }
        catch(err){
            return err;
        }
    }

    
    module.exports.getCampGroundDetails = async(req)=>{
        const campGroundName = req;
        console.log(campGroundName)
        try{
            const campGroundDetails = await CampGround.findAll({
                where : {
                    name: {
                        [Op.like]:`%${campGroundName}%`
                    }
                },
                raw:true
            });
            return campGroundDetails;
        }
        catch(err){
            return err;
        }
    }

    module.exports.insertEmails = async(req)=>{
        try{
            const emails=req;
            const emailAdded = await Email.bulkCreate(emails);
            return emailAdded;
        }
        catch(err){
            return err;
        }
    }

    module.exports.getEmails = async(req)=>{
        const campgroundid = req;
        try{
            const emailList = await Email.findAll({
                where : {campgroundid},
                attributes : ['email'],
                raw:true
            });
            return emailList.map(mail=>mail.email);
        }
        catch(err){
            return err;
        }
    }
