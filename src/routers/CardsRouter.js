import express from "express";
import {
  addCardsController,
  CardsWithAllController,
  deleteOneCardsController,
  getOneCardsController,
  updateOneRestoController,
  
  // CardsWithAllController,
} from "../controllers/CardsController";
import { protect } from "../middlewares/protect";

const router = express.Router();

router.delete("/delete/:id",  deleteOneCardsController);
router.post("/add/",  addCardsController);
router.get("/", CardsWithAllController);
router.get("/all", CardsWithAllController);
router.get("/one/:id", getOneCardsController);
router.put("/:id", updateOneRestoController);

export default router;
