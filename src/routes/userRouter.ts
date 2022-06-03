import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
// import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
// import { validateAdminTokenMiddleware } from "../middlewares/validateAdminTokenMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();
userRouter.post(
	"/signup",
	validateSchemaMiddleware(userSchema.userRegisterSchema),
	userController.SignUp
);
userRouter.post(
	"/signin",
	validateSchemaMiddleware(userSchema.userLoginSchema),
	userController.SignIn
);

// userRouter.get("/users", validateTokenMiddleware, getUser);
// userRouter.get("/rank", getRank);
// userRouter.get("/rank2", getRank2);
// userRouter.get("/resume", validateTokenMiddleware, getResume);

export default userRouter;
