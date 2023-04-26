// eylemlerle ilgili ara katman yazılımları yazın
// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require("./actions-model");
const projectModel = require("../projects/projects-model");

async function checkActionId(req,res,next){
    try {
        const existAction = await actionsModel.get(req.params.id);
        if(!existAction){
            res.status(404).json({message:"Actions not found"});
        }else{
            req.action = existAction;
            next();
        }
    } catch (error) {
        next(error);
    }
}

async function checkActionPayload(req,res,next){
    const {project_id,description,notes,completed} = req.body;
    if(!project_id || !description || !notes || typeof(completed)!="boolean" || description.length>128){
        res.status(400).json({message:"Payload kontrol ediniz."});
    }else{
        const existProject = await projectModel.get(project_id);
        if(!existProject){
            res.status(400).json({message:"project not found"})
        }else{
            req.validAction = {
                project_id:project_id,
                description:description,
                notes : notes,
                completed :completed
            }
            next();
        }
    }
}

module.exports = {
    checkActionId,
    checkActionPayload
}
