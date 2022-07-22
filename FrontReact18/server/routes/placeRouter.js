import { Router } from "express";

import { createPlace } from "../controllers/place.js";
import auth from "../middleware/auth.js";
/* import auth from "../middleware/auth.js"; */

const placeRouter = Router();
placeRouter.post("/", auth, createPlace);
export default placeRouter;
