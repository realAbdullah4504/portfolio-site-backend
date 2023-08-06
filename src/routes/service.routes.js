const router = require("express").Router();
const service=require("../controllers/service.controllers");

router.get('/',service.getServices);
router.post('/',service.postService);
router.patch('/:id',service.updateService);
router.delete('/:id',service.deleteService);


module.exports=router;