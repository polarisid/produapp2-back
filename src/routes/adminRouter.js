// import { Router } from "express";
// import {
// 	createUser,
// 	getUsers,
// 	getTotalResume,
// 	getResume,
// 	getUserAdmin,
// 	createAdmin,
// 	getTotalResumeByDate,
// } from "../controllers/userController.js";
// import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
// import { validateAdminTokenMiddleware } from "../middlewares/validateAdminTokenMiddleware.js";
// import userSchema from "../schemas/userSchema.js";

// const adminRouter = Router();

// adminRouter.get("/admin", validateAdminTokenMiddleware, getUserAdmin);
// adminRouter.post("/admin", validateSchemaMiddleware(userSchema), createAdmin);
// adminRouter.get("/admin/users", getUsers);
// adminRouter.get("/admin/resume", getTotalResume);
// adminRouter.get("/admin/bydate", getTotalResumeByDate);

// export default adminRouter;
