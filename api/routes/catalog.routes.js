import { Router } from "express";
import * as catalogController from "../controllers/catalog.controller.js";

const router = Router();

router.get("/api/catalogo", catalogController.getCatalog);
router.get("/api/catalogo/:id", catalogController.getContentById);
router.post("/api/catalogo", catalogController.saveContent);
router.patch("/api/catalogo/:id", catalogController.editContent);
router.delete("/api/catalogo/:id", catalogController.deleteContent);
router.patch("/api/catalogo/:id/productora",catalogController.assignProductora,
);

export default router;
