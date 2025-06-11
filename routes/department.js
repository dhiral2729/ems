const express=require("express")
const router=express.Router()
const depcontroller=require("../controllers/department")
router.post("/add",depcontroller.addDepartment)
router.get("/all",depcontroller.getAllDepartment)
router.get("/:id",depcontroller.getDepById)
router.put("/:id",depcontroller.updateDep)
router.delete("/:id",depcontroller.deleteDep)
module.exports=router