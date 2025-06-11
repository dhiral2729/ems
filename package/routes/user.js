const express = require('express');
const router = express.Router();
const authController = require("../controllers/user")
const auth=require("../middleware/authmiddle")


// Route for user signup
router.post('/signup', authController.Signup);
router.post("/login",authController.Login)
router.get("/verify",auth.authmiddleware)


module.exports = router;