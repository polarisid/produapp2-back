import { Router } from "express";
import { AuthenticationdMiddleware } from "../middlewares/AuthenticationdMiddleware.js";
import itemsController from "../controllers/itemsController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import itemsSchema from "../schemas/itemsSchema.js";
const itemsRouter = Router();

itemsRouter.get(
	"/items/workspace",
	AuthenticationdMiddleware,
	itemsController.GetWorkSpace
);
itemsRouter.post(
	"/items/workspace",
	validateSchemaMiddleware(itemsSchema.createItemSchema),
	AuthenticationdMiddleware,
	itemsController.InsertNewItem
);
itemsRouter.patch(
	"/items/workspace/status/:id",
	validateSchemaMiddleware(itemsSchema.updateStatusSchema),
	AuthenticationdMiddleware,
	itemsController.UpdateStatus
);
itemsRouter.patch(
	"/items/workspace/:id/:elapsedTime",
	AuthenticationdMiddleware,
	itemsController.UpdateElapsedTime
);

export default itemsRouter;