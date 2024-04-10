// const { default: mongoose } = require("mongoose")

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        // required: [true, 'Enter your name'],
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Enter your email '],
        lowercase: true,
        validate: [value => validator.isEmail(value), " Please Enter a valid email"]
    },
    number: {
        type: Number,
        // required: [true,'Enter your number'],
        min: [1000000000 , "Short Range"],
        max: [9999999999 , "Large Range"],
        unique: true
    },
    password: {
        type: String,
        // required: true,
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        // required: true,
        minlength: 8, 
        validate: {
            validator: function (value) {
                return value == this.password;
            },
            message: 'password and confirmpassword are not match!'
        } 
    },
    passwordResetToken : String,
    passwordResetTokenExpire : Date,
    otp : {type: Number},
    cart : [{
        productId: {type : mongoose.Schema.Types.ObjectId, ref: 'Product'},
        count : {type : Number}
    }]
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    //Password is Convert palintext to ciphertext  
    this.password = bcrypt.hash(this.password, 12);
    // console.log(this.password);

    this.confirmPassword = undefined;
    next();

});
userSchema.methods.comparePaaswordIndb = async function(pswd,pswdDB){
    return await bcrypt.compare(pswd,pswdDB);
}

userSchema.methods.isPasswordChanged = async function(JWTTimestamp){
    if (this.PasswordChangedAt) {
        const pswdCahngedTimestamp = parseInt(this.PasswordChangedAt.getTime() / 1000,10);
        console.log(pswdCahngedTimestamp,JWTTimestamp);

       return JWTTimestamp < pswdCahngedTimestamp;
    }
    return false;
}

userSchema.methods.resetPasswordToken = function(){
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetTokenExpire = Date.now + (10*60*1000);

        return resetToken;
}
const User = new mongoose.model('User', userSchema);

module.exports = User;