import { Router } from "express";
import userRouter from "./userRouter.js";
import itemsRouter from "./itemsRouter.js";

const router = Router();
router.use(userRouter);
router.use(itemsRouter);

export default router;
