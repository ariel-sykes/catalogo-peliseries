import * as catalogController from "../controllers/catalog.controller.js";
import { Router } from "express";

const router = Router();

router.get("/catalogo", catalogController.getCatalog);
router.get("/catalogo/nuevo", catalogController.newContentForm);
router.post("/catalogo/nuevo", catalogController.saveContent);
router.get("/catalogo/editar/:id", catalogController.editContentForm);
router.post("/catalogo/editar/:id", catalogController.editContent);
router.get("/catalogo/borrar/:id", catalogController.deleteContentForm);
router.post("/catalogo/borrar/:id", catalogController.deleteContent);
router.get("/catalogo/:id", catalogController.getContentById);

export default router;
