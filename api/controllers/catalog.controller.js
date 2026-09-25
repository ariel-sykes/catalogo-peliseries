import * as catalogService from "../../services/catalog.services.js";
import { ObjectId } from "mongodb";

export async function getCatalog(req, res) {
  try {
    const filtros = req.query;
    const catalogo = await catalogService.getCatalog(filtros);
    res.status(200).json(catalogo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "No se pudo obtener el catálogo",
    });
  }
}

export async function getContentById(req, res) {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "El ID tiene un formato inválido",
      });
    }

    const contenido = await catalogService.getCatalogById(id);

    if (!contenido) {
      return res.status(404).json({
        message: "Contenido no encontrado",
      });
    }

    res.status(200).json(contenido);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "No se pudo obtener el contenido",
    });
  }
}

export async function saveContent(req, res) {
  try {
    const contenido = await catalogService.saveContent(req.body);
    res.status(201).json(contenido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo crear el contenido" });
  }
}

export async function editContent(req, res) {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id))
      return res.status(400).json({ message: "ID inválido" });

    const contenido = await catalogService.editContent(id, req.body);

    if (!contenido)
      return res.status(404).json({ message: "Contenido no encontrado" });

    res.status(200).json(contenido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo editar el contenido" });
  }
}

export async function deleteContent(req, res) {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id))
      return res.status(400).json({ message: "ID inválido" });

    const contenido = await catalogService.deleteContentLogico(id);

    if (!contenido)
      return res.status(404).json({ message: "Contenido no encontrado" });

    res.status(200).json({ message: "Contenido eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo eliminar el contenido" });
  }
}

export async function assignProductora(req, res) {
  try {
    const idContenido = req.params.id;
    const idProductora = req.body.productora_id;

    if (!ObjectId.isValid(idContenido) || !ObjectId.isValid(idProductora)) {
      return res.status(400).json({
        message: "El ID del contenido o de la productora es inválido",
      });
    }

    const contenido = await catalogService.assignProductora(
      idContenido,
      idProductora,
    );

    if (!contenido) {
      return res.status(404).json({
        message: "Contenido o productora no encontrados",
      });
    }

    res.status(200).json(contenido);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "No se pudo asignar la productora",
    });
  }
}
