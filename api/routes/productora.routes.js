import { Router } from "express";
import * as productoraController from "../controllers/productora.controller.js";

const router = Router();

router.get("/api/productoras", productoraController.getProductoras);
router.post("/api/productoras", productoraController.saveProductora);
router.get("/api/productoras/:id/contenidos",productoraController.getProductoraContents);
router.get("/api/productoras/:id", productoraController.getProductoraById);

export default router;
