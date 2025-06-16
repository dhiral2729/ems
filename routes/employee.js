const express = require("express")
const router = express.Router()
const { addEmp,upload ,getAllEmp,getEmpById,updateEmp, deleteEmp} = require("../controllers/employee")
router.post("/create",upload.single('image'),addEmp)
router.get("/department/all",getAllEmp)
router.get("/department/:id",getEmpById)
router.put("/upadte/:id",updateEmp)
router.delete("/delete/:id",deleteEmp)
module.exports = router