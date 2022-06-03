import joi from "joi";
import { UserRegisterType, UserLoginType } from "../types/userTypes.js";
const userRegisterSchema = joi.object<UserRegisterType>({
	name: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	ascCode: joi.string().valid("SLZ5286953", "AJU3198122").required(),
});

const userLoginSchema = joi.object<UserLoginType>({
	email: joi.string().email().required(),
	password: joi.string().required(),
});

export default { userRegisterSchema, userLoginSchema };
