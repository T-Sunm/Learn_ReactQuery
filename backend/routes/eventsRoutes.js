import express from "express";
import { deleteEvent, getEvent, getEvents, getImageEvent, postEvent, putEvent } from "../controller/event.js";
const router = express.Router();

router.get("/events", getEvents)
// router.get("/events/:id", getEvent)
router.post("/events", postEvent)
router.put("/events/:id", putEvent)
router.delete("/events/:id", deleteEvent)
// router.get("events/images", getImageEvent)

export { router as eventRouter };