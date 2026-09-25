import * as productoraService from "../../services/productora.services.js";
import { ObjectId } from "mongodb";

export async function getProductoras(req, res) {
  try {
    const productoras = await productoraService.getProductoras();

    res.status(200).json(productoras);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "No se pudieron obtener las productoras",
    });
  }
}

export async function saveProductora(req, res) {
  try {
    const { nombre, descripcion, imagen } = req.body;

    if (!nombre || !descripcion || !imagen) {
      return res.status(400).json({
        message: "Nombre, descripción e imagen son obligatorios",
      });
    }

    const productora = await productoraService.saveProductora({
      nombre,
      descripcion,
      imagen,
    });

    res.status(201).json(productora);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "No se pudo guardar la productora",
    });
  }
}

export async function getProductoraById(req, res) {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const productora = await productoraService.getProductoraById(id);

    if (!productora) {
      return res.status(404).json({
        message: "Productora no encontrada",
      });
    }

    res.status(200).json(productora);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "No se pudo obtener la productora",
    });
  }
}

export async function getProductoraContents(req, res) {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const productora = await productoraService.getProductoraById(id);

    if (!productora) {
      return res.status(404).json({
        message: "Productora no encontrada",
      });
    }

    const contenidos = await productoraService.getProductoraContents(id);

    res.status(200).json(contenidos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "No se pudieron obtener los contenidos",
    });
  }
}
