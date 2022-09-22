import express from "express";
import UserController from "../controller/UserController.js";

const UserRouter = express.Router();
UserRouter.get("/all", UserController.getAllUser);
UserRouter.post("/login", UserController.login);
UserRouter.post("/register", UserController.register);
UserRouter.put("/update", UserController.update);

export default UserRouter;
