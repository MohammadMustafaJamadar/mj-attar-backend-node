import express from "express";
import bodyParser from "body-parser";
import { user_signup_controller } from "../controller/userSignupController.js";
import { user_login_controller } from "../controller/userLoginController.js";

const userAuthRouter = express.Router();

userAuthRouter.use(bodyParser.urlencoded({ extended: true }));
userAuthRouter.use(bodyParser.json());

userAuthRouter.post('/signup', user_signup_controller);
userAuthRouter.post('/login',user_login_controller);

export default userAuthRouter;
