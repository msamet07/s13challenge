// projects ara yazılımları buraya
// projects ara yazılımları buraya
const projectsModel = require("./projects-model");

async function checkProjectId(req,res,next){
    try {
        const {id} = req.params;
        const existProject = await projectsModel.get(id);
        if(!existProject){
            res.status(404).json({message:"project not found"})
        }else{
            req.project = existProject;
            next();
        }
    } catch (error) {
        next(error);
    }
}

function checkProjectPayload(req,res,next){
    let {name,description,completed} = req.body;
    if(!name || !description || typeof completed!="boolean" || name.length>128){
        res.status(400).json({message:"Payload kontrol ediniz."});
    }else{
        req.validProject = {name:name,description:description,completed:completed};
        next();
    }
}

module.exports = {
    checkProjectId,
    checkProjectPayload
}