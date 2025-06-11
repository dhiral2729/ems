const express = require("express")
const router = express.Router()
const { addEmp,upload } = require("../controllers/employee")
router.post("/create",upload.single('image'),addEmp)
module.exports = router