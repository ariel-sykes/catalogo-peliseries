import {
  createContentFormEditPage,
  createContentFormPage,
  createDetailDelete,
  createDetailPage,
  createListPage,
  createPage,
} from "../page/utils.js";

export function catalogList(catalogo) {
  return createPage("Películas y Series", createListPage(catalogo));
}

export function page404() {
  return createPage("404", "Página no encontrada");
}

export function content(contenido) {
  return createPage(contenido.titulo, createDetailPage(contenido));
}

export function newContentForm(productoras) {
  return createPage("Nuevo contenido", createContentFormPage(productoras));
}

export function editContentForm(contenido, productoras) {
  return createPage(
    "Editar contenido",
    createContentFormEditPage(contenido, productoras),
  );
}

export function createDetailDeletePage(contenido) {
  return createPage(
    "Desea borrar: " + contenido.titulo,
    createDetailDelete(contenido),
  );
}
