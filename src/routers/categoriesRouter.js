import express from "express";
import {
  addCategoryController,
  CategoryWithAllController,
  deleteOneCategoryController,
  getOneCategoryController,
  updateOneCategoryController,
} from "../controllers/categoriesController"; // Update the import for the CategoriesController
// import { protect } from "../middlewares/protect";

const router = express.Router();

router.delete("/delete/:id", deleteOneCategoryController);
router.post("/add/", addCategoryController);
router.get("/", CategoryWithAllController);
router.get("/all", CategoryWithAllController);
router.get("/one/:id", getOneCategoryController);
router.put("/:id", updateOneCategoryController);

export default router;
