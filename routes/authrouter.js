const express = require('express');
const AuthController = require("../controller/authController");
// const OtpController = require("../controller/otpController");
// const setHeader = require("../middleware/valid");

const router = express.Router();

router.route('/signup').post(AuthController.signup);
router.route('/createOtp').post(AuthController.createOtp);
router.route('/verify').post(AuthController.verifyOtp);
router.route('/login').post(AuthController.login);
router.route('/logout').post(AuthController.logout);
router.route('/forgotPassword').post(AuthController.forgotPassword);
router.route('/resetPassword/:token').patch(AuthController.resetPassword);


module.exports = router;