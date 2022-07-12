const {service_request} = require('./models');

    module.exports = async(req)=>{
        console.log(req+" In Service");
        try{
            const response = await service_request.create({
                url: req,
                status: "new"
            });
            res=response.id;
            console.log(res)
            return res;
        }
        catch(err){
            res=err;
            return res;
        }
    }
