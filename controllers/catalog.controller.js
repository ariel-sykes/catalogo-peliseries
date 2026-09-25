import * as catalogService from "../services/catalog.services.js";
import * as catalogView from "../views/catalog.views.js";
import * as productoraService from "../services/productora.services.js";

export async function getCatalog(req, res) {
  try {
    const filtros = req.query;

    const catalogo = await catalogService.getCatalog(filtros);

    res.send(catalogView.catalogList(catalogo));
  } catch (error) {
    console.error(error);
    res.send(catalogView.page404());
  }
}

export async function getContentById(req, res) {
  try {
    const id = req.params?.id;
    const contenido = await catalogService.getCatalogById(id);

    res.send(catalogView.content(contenido));
  } catch (error) {
    res.send(catalogView.page404());
  }
}

export async function newContentForm(req, res) {
  try {
    const productoras = await productoraService.getProductoras();

    res.send(catalogView.newContentForm(productoras));
  } catch (error) {
    console.error(error);
    res.send(catalogView.page404());
  }
}

export async function saveContent(req, res) {
  try {
    const contenido = await catalogService.saveContent(req.body);

    res.send(catalogView.content(contenido));
  } catch (error) {
    res.send(catalogView.page404());
  }
}

export async function editContentForm(req, res) {
  try {
    const id = req.params.id;

    const [contenido, productoras] = await Promise.all([
      catalogService.getCatalogById(id),
      productoraService.getProductoras(),
    ]);

    res.send(catalogView.editContentForm(contenido, productoras));
  } catch (error) {
    console.error(error);
    res.send(catalogView.page404());
  }
}

export async function editContent(req, res) {
  try {
    const id = req.params?.id;
    const contenido = await catalogService.editContent(id, req.body);

    res.send(catalogView.content(contenido));
  } catch (error) {
    res.send(catalogView.page404());
  }
}

export async function deleteContentForm(req, res) {
  try {
    const id = req.params?.id;
    const contenido = await catalogService.getCatalogById(id);

    res.send(catalogView.createDetailDeletePage(contenido));
  } catch (error) {
    res.send(catalogView.page404());
  }
}

export async function deleteContent(req, res) {
  try {
    const id = req.params?.id;

    const contenido = await catalogService.deleteContentLogico(id);

    res.send(catalogView.content(contenido));
  } catch (error) {
    res.send(catalogView.page404());
  }
}
