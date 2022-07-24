import { Router } from "express";

import { createPlace, getPlaces } from "../controllers/place.js";
import auth from "../middleware/auth.js";

const placeRouter = Router();
placeRouter.post("/", auth, createPlace);
placeRouter.get("/", getPlaces);

export default placeRouter;
