import express from "express";
import {
  createListing,
  updateListingById,
  getAllListings,
  getListingById,
} from "../controllers/listing-controller.js";
import { errorCatcher } from "../middleware/error-catcher.js";
import upload from "../middleware/image-upload.js";
import jwtVerify from "../middleware/jwt-verify.js";

const router = express.Router();

router.post("/", jwtVerify(), upload, errorCatcher(createListing));

router.get("/", errorCatcher(getAllListings));

router.get("/:id", errorCatcher(getListingById));

router.post("/:id", errorCatcher(updateListingById));

export { router as listRoutes };
