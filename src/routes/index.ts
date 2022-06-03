import { Router } from "express";
// import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import itemsRouter from "./itemsRouter.js";
// import formRouter from "./formRouter.js";
// import adminRouter from "./adminRouter.js";
const router = Router();
// router.use(authRouter);
router.use(userRouter);
router.use(itemsRouter);
// router.use(formRouter);
// router.use(adminRouter);

export default router;
