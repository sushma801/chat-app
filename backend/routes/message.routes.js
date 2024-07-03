import express from "express";
import {
  handleSendMessage,
  handleGetMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/:id", protectRoute, handleGetMessage);

router.post("/send/:id", protectRoute, handleSendMessage);

export default router;
