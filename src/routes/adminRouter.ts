import { Router } from "express";
import { AuthenticationdMiddleware } from "../middlewares/AuthenticationdMiddleware.js";
import itemsSchema from "../schemas/itemsSchema.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import adminController from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.get(
	"/admin/items/workspace/:asc",
	AuthenticationdMiddleware,
	adminController.GetDasboard
);

export default adminRouter;
