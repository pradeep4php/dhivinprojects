const {service_request} = require('./models');

    module.exports.webscrapper = async(req)=>{
        console.log(req+" In Service");
        try{
            const response = await service_request.create({
                url: req,
                status: "new"
            });
            return response.id;
        }
        catch(err){
            return err;
        }
    }

    module.exports.getcurrentstatus = async(req)=>{
        const id=req;
        console.log(id)
        try{
            const response = await service_request.findOne({
                where: {id}
            });
            console.log(response.status)
            return response.status;
        }
        catch(err){
            return res;
        }
    }
