const express = require('express');
const router = express.Router();
const authController = require("../controllers/user")
// Route for user signup
router.post('/signup', authController.Signup);
router.post("/login",authController.Login)
module.exports = router;
