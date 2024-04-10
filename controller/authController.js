const express = require("express");
const mongoose = require("mongoose");
const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");
const util = require("util");
const Product = require("../model/productModel");
const sendemail = require('../utils/email');
const crypto = require("crypto");
const Randomstring = require("randomstring");
const bcrypt = require("bcrypt");
// const OtpController = require("./otpController");

function otpGenerate() {
    return Randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}
const createSendResponse = (user, statuscode, res) => {
    const token = signToken(user._id);

    res.status(statuscode).json({
        status: "success",
        token,
        data: {
            user
        },
    });
}

const signToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXP,
    });
};

//  Above all FUNction

exports.signup = async (req, res) => {
    try {
        const { email, name, number, password, confirmPassword } = req.body;

        const otp = otpGenerate();
        // function valid(otp) {
        //     otp = Date.now() + 15000
        //     if (otp < Date.now()) {
        //         console.log("Your OTP is Valid");
        //     } else {
        //         console.log("Your OTP is Expire");
        //     }
        // } valid(otp);
        const newuser = await User.create({ email, name, number, password, confirmPassword, otp });
        const message = `Your Signup OTP is ${otp} it's valid only for 5 minutes`;
        const token = signToken(newuser._id);

        try {
            await sendemail({
                email: newuser.email,
                subject: "Regarding Your OTP",
                message: message
            })
            res.status(200).json({
                success: true,
                token,
                message: "Your OTP sent Successfully"
            })
            return;

            // req.user = newuser;
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
            // return;
        }
        createSendResponse(newuser, 200, res);


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        })
    }
    // req.newuser = newuser;
}

exports.verifyOtp = async (req, res) => {
    const testToken = req.headers.authorization;
    let token;
    if ((testToken) && testToken.startsWith('Bearer')) {
        token = testToken.split(" ")[1];
    }
    if (!token) {
        res.status(404).json({
            success: false,
            message: "Token is not define"
        })
        return;
    }
    // console.log("abc");
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    // console.log(decodedToken +" = decodedToken");
    const user = await User.findById(decodedToken.id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "Token is not valid"
        });
        return;

    }
    const { otp } = req.body;
    const existOtp = await User.findOne({ otp });

    // console.log(existOtp);
    if (!existOtp) {
        res.status(404).json({
            status: false,
            message: "Invalid OTP!"
        })
        return;
    }
    res.status(200).json({
        status: true,
        message: "OTP Verification is Successfull",
    });
    return;

}

exports.login = async (req, res, next) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            res.status(400).json({
                status: "fail",
                message: "Please Provide email or password"
            })
        }
        const user = await User.findOne({ email: email }).select("+password");

        // const isMatch = await user.comparePaaswordIndb(password , user.password);
        // console.log(user.password +" = user");
        // console.log(password +" = db pswd");

        if (!user || !(await user.comparePaaswordIndb(password, user.password))) {
            res.status(400).json({
                status: "Error",
                message: "Incorrect email or password",

            })
            return;
        }
        console.log(password + " = pswd ");
        console.log(user.password + " = pswddb ");

        const token = signToken(user._id);

        res.status(200).json({
            status: " Success ",
            token,
            message: "Data is valid",
        });
    } catch (error) {
        res.status(404).json({
            status: "Error",
            message: error.message
        });
    }
    next();
}

exports.protect = async (req, res, next) => {
    // 1> READ THE TOKEN & CHECK IF ITS EXIST IN Request Header
    const testToken = req.headers.authorization;
    let token;
    if ((testToken) && testToken.startsWith('Bearer')) {
        token = testToken.split(" ")[1];
    }
    // some modifty the token
    if (!token) {
        res.status(404).json({
            status: "Fail",
            message: "You  are not loggedIn!"
        })
    }
    // 2> validate the token
    const decodedtoken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);


    // 3> User exist in database or not 
    const user = await User.findById(decodedtoken.id);
    if (!user) {
        res.status(404).json({
            status: "fail",
            message: "You are not logged in!"
        });
    }
    // 4> If the user is changed password
    const isPswdChanged = await product.isPasswordChanged(decodedToken.iat);
    if (isPswdChanged) {
        const err = new customError("The password changed successfully please login again", 401);
        return next(err);
    } //iat stand for issue at token time
    // 5> Allow user to access route
    req.user = user;
    next();
}

exports.logout = async (req, res) => {
    const tokenTest = req.headers.authorization;
    let token;
    if ((tokenTest) && tokenTest.startsWith('Bearer')) {
        token = tokenTest.split(' ')[1];
    }

    if (!token) {
        res.status(404).json({
            success: false,
            message: "User is not loggedin!"
        });
        return;
    }

    const verifyToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
    // console.log(verifyToken);
    const user = await User.findById(verifyToken.id);
    if (!user) {
        res.status(400).json({
            success: false,
            message: "User have not give valid token in the request header"
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    });
}

exports.forgotPassword = async (req, res, next) => {
    let user;

    try {
        let { email } = req.body;
        user = await User.findOne({ email });
        // console.log("user = ", user);
        if (!user) {
            res.status(404).json({
                success: false,
                message: `Given user email ${user} with OTP  is not in the database`
            });
            return;
        }
        if (!req.body.otp && !req.body.password) {
            const OTP = otpGenerate();
            const OtP = OTP;
            const message = `Your Forgot password OTP is ${OtP} it's valid only for 5 minutes`;

            await sendemail({
                email: email,
                subject: "Your Forgot Password OTP",
                message: message
            });
            res.status(200).json({
                status: "success",
                message: "Your OTP Sent Successfully"
            });
            // return;
            // console.log(user.otp +" uotpps");
            if (user.otp = OtP) {
                user.save();
            }
            // console.log(user.otp + " dbuotp");
        }
        if (req.body.otp) {
            // console.log(user.otp + " = otps");
            if (user.otp == req.body.otp) {
                res.status(200).json({
                    success: true,
                    message: "OTP matched Successfully"
                })
            } else {
                res.status(404).json({
                    message: "Invalid OTP"
                })
            }
        }
        if (req.body.password) {

            user.password = req.body.password;
            user.save();
            res.status(201).json({
                success: true,
                message: "Your Password is reset"
            });

        }
        // console.log(user.otp + "= Uotps");
        // console.log(otp + "= otps"); 
        // console.log(OtP + "= otpsssss"); 


    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message || "An error occurred"
        });
    }
    next();
};

exports.resetPassword = async (req, res, next) => {
    try {

        // const token = crypto.createHash("sha256").update(req.params.token).digest('hex');
        // const token = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // const user = await User.findOne({passwordResetToken : token});
        const user = await User.findOne({ passwordResetToken: crypto.createHash('sha256').update(req.params.token).digest('hex') });

        // console.log(user);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Token is invald or has expired"
            })
        }
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpire = undefined;
        user.isPasswordChanged = Date.now();

        user.save();

        const loginToken = signToken(user._id);

        res.status(200).json({
            success: true,
            token: loginToken
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    next();
}

exports.createOtp = async (req, res, next) => {
    function generateOtp() {
        return Randomstring.generate({
            length: 6,
            charset: "numeric"
        });
    }

    try {
        const OTP = generateOtp();
        const otp = OTP;
        const { email } = req.body;
        const user = await User.create({ email, otp });
        const message = `Your OTP is ${otp}`;
        await sendemail({
            email: user.email,
            subject: "Your OTP",
            message: message
        });
        res.status(200).json({
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.cartItem = async (req, res) => {
    try {
        const { email } = req.params;
        const { productId, quantity = 1 } = req.body;
        const cartUser = await User.findOne({ email }).populate('cart.productId');
        if (!cartUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existCartItem = cartUser.cart.find(item => item.productId.toString() === productId);
        if (existCartItem) {
            existCartItem.count += quantity ;
        }else{
            cartUser.cart.push({ productId, count: quantity });
        }
        
        let totalCount = cartUser.cart.reduce((total, item) => total + item.count, 0);
        
        cartUser.otp = undefined;
        res.status(200).json({
            success: true,
            data: {
                cartUser
            },
            totalCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}