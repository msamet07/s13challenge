// "eylem" routerını buraya yazın
// "eylem" routerını buraya yazın
const router = require("express").Router();

const actionsModel = require("./actions-model");
const mw = require("./actions-middlware");

router.get("/",async (req,res,next)=>{
    try {
        const allActions = await actionsModel.get();
        res.json(allActions);
    } catch (error) {
        next();
    }
});
router.get("/:id",mw.checkActionId,(req,res,next)=>{
    try {
        res.json(req.action);
    } catch (error) {
        next(error);
    }
});
router.post("/",mw.checkActionPayload,async (req,res,next)=>{
    try {
        const insertedAction = await actionsModel.insert(req.validAction);
        res.status(201).json(insertedAction)
    } catch (error) {
        next(error);
    }
});
router.put("/:id",mw.checkActionId,mw.checkActionPayload,async (req,res,next)=>{
    try {
        const updatedAction = await actionsModel.update(req.params.id,req.validAction);
        res.json(updatedAction);
    } catch (error) {
        next(error);
    }
});
router.delete("/:id",mw.checkActionId,async (req,res,next)=>{
    try {
        await actionsModel.remove(req.params.id);
        res.json({message:`${req.params.id} ID'li action silindi`});
    } catch (error) {
        next(error);
    }
});

module.exports = router;