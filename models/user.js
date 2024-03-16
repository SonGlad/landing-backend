const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers/index");


const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, "User name is required"]
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, "Set password for the user"],

    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    } 

}, {versionKey:false, timestamps: true});


userSchema.post("save", handleMongooseError);


const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
});


const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
});


const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});


const verifySchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required()
});


const userResetPasswordSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    // newPassword: Joi.string().min(6).required(),
});


const schemas = { 
    registerSchema, 
    loginSchema, 
    updateSubscriptionSchema, 
    verifySchema, 
    userResetPasswordSchema
};
const User = model("users", userSchema);


module.exports = {schemas, User};