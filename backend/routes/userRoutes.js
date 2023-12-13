import express from "express";
import { CreateUser, Login } from "../controller/user.js";
const router = express.Router();

router.post("/createUser", CreateUser)
router.post("/login", Login)

export { router as userRouter };