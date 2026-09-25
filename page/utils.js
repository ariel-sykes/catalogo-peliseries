// Estructura general de todas las páginas
export function createPage(title, content) {
  return /* html */ `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>${title} · Cinerama</title>

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
          rel="stylesheet"
        >
        <link href="/css/catalogo.css" rel="stylesheet">
        <link href="/css/nav.css" rel="stylesheet">
      </head>

      <body>
        <div class="top-strip">
          TU COLECCIÓN · PELÍCULAS, SERIES Y GRANDES HISTORIAS
        </div>

        <header class="site-header">
          <div class="header-inner">
            <a class="brand" href="/catalogo">CINERAMA</a>

            <nav aria-label="Navegación principal">
              <a href="/catalogo">Catálogo</a>
              <a class="nav-add" href="/catalogo/nuevo">
                + Nuevo contenido
              </a>
            </nav>
          </div>
        </header>

        <nav class="genre-menu" aria-label="Secciones del catálogo">
          <div class="genre-menu-inner">
            <a href="/catalogo">Todos</a>
            <a href="/catalogo?genero=Acción">Acción</a>
            <a href="/catalogo?genero=Comedia">Comedia</a>
            <a href="/catalogo?genero=Drama">Drama</a>
            <a href="/catalogo?genero=Terror">Terror</a>
            <a href="/catalogo?genero=Ciencia ficción">
              Ciencia ficción
            </a>
          </div>
        </nav>

        <main class="site-main">
          <div class="page-heading">
            <p class="eyebrow">TU COLECCIÓN DE CINE</p>
            <h1>${title}</h1>
          </div>

          ${content}
        </main>

        <footer class="site-footer">
          <span>CINERAMA</span>
          <p>Historias para volver a descubrir.</p>
          <a href="/catalogo">Volver al catálogo ↑</a>
        </footer>
      </body>
    </html>
  `;
}

// Listado del catálogo
export function createListPage(lista) {
  const cards = lista
    .map((contenido) => {
      const id = encodeURIComponent(String(contenido._id));
      const generos = String(contenido.genero ?? "").split(" / ");

      const imagen = contenido.imagen
        ? `<img
            src="${contenido.imagen}"
            alt="Póster de ${contenido.titulo}"
            loading="lazy"
          >`
        : `<span class="poster-placeholder">SIN PÓSTER</span>`;

      return /* html */ `
        <article class="movie-card">
          <a
            class="poster-link"
            href="/catalogo/${id}"
            aria-label="Ver ${contenido.titulo}"
          >
            <div class="poster">${imagen}</div>
            <span class="type-badge">${contenido.tipo}</span>
          </a>

          <div class="movie-info">
            <p class="movie-meta">
              <span>${contenido.anio}</span>
              <span>${generos[0]}</span>
            </p>

            <h2>
              <a href="/catalogo/${id}">${contenido.titulo}</a>
            </h2>

            <p class="movie-genres">${contenido.genero}</p>

            <div class="card-actions">
              <a class="view-link" href="/catalogo/${id}">
                Ver película <span aria-hidden="true">↗</span>
              </a>

              <div>
                <a href="/catalogo/editar/${id}">Editar</a>
                <a class="delete-link" href="/catalogo/borrar/${id}">
                  Borrar
                </a>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  const contenido = cards || /* html */ `
    <p class="empty-state">
      Tu colección está esperando su primera historia.
    </p>
  `;

  return /* html */ `
    <p class="intro">
      Tu próxima historia empieza acá.
      Explorá las películas y series de tu colección.
    </p>

    <div class="collection-bar">
      <h2>
        Explorá el catálogo
        <span>${lista.length} títulos</span>
      </h2>

      <span class="collection-note">
        Una colección, muchas historias
      </span>
    </div>

    <section class="movie-grid" aria-label="Películas y series">
      ${contenido}
    </section>
  `;
}

// Detalle de una película o serie
export function createDetailPage(contenido) {
  const id = encodeURIComponent(String(contenido._id));

  const imagen = contenido.imagen
    ? `<img src="${contenido.imagen}" alt="Póster de ${contenido.titulo}">`
    : `<span class="poster-placeholder">SIN PÓSTER</span>`;

  const botonEnlace = contenido.enlace
    ? /* html */ `
        <a
          class="btn btn-outline-secondary"
          href="${contenido.enlace}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver ficha externa ↗
        </a>
      `
    : "";

  const detalleProductora = contenido.productora?.nombre
    ? /* html */ `
        <p class="detail-producer">
          <strong>Productora:</strong>
          ${contenido.productora.nombre}
        </p>
      `
    : "";

  return /* html */ `
    <a class="back-link" href="/catalogo">
      ← Volver al catálogo
    </a>

    <article class="detail-panel">
      <div class="poster">${imagen}</div>

      <div class="detail-copy">
        <p class="eyebrow">
          ${contenido.tipo} · ${contenido.anio}
        </p>

        <h2>${contenido.titulo}</h2>
        <p class="detail-genres">${contenido.genero}</p>

        ${detalleProductora}

        <h3>Sinopsis</h3>
        <p class="synopsis">
          ${contenido.descripcion || "Todavía no hay una sinopsis."}
        </p>

        <div class="detail-actions">
          ${botonEnlace}

          <a class="btn btn-primary" href="/catalogo/editar/${id}">
            Editar contenido
          </a>

          <a class="btn btn-outline-danger" href="/catalogo/borrar/${id}">
            Borrar
          </a>
        </div>
      </div>
    </article>
  `;
}

// Formulario para crear contenido
export function createContentFormPage(productoras = []) {
  const opcionesProductoras = productoras
    .map(
      (productora) => /* html */ `
        <option value="${productora._id}">
          ${productora.nombre}
        </option>
      `,
    )
    .join("");

  return /* html */ `
    <form action="/catalogo/nuevo" method="POST">
      <div class="my-2">
        <label class="form-label">Título:</label>
        <input class="form-control" name="titulo">
      </div>

      <div class="my-2">
        <label class="form-label">Tipo:</label>
        <input class="form-control" name="tipo">
      </div>

      <div class="my-2">
        <label class="form-label">Productora:</label>
        <select class="form-select" name="productora_id" required>
          <option value="">Seleccioná una productora</option>
          ${opcionesProductoras}
        </select>
      </div>

      <div class="my-2">
        <label class="form-label">Género:</label>
        <input class="form-control" name="genero">
      </div>

      <div class="my-2">
        <label class="form-label">Año:</label>
        <input class="form-control" name="anio">
      </div>

      <div class="my-2">
        <label class="form-label">Descripción:</label>
        <textarea
          class="form-control"
          name="descripcion"
          rows="4"
          required
        ></textarea>
      </div>

      <div class="my-2">
        <label class="form-label">Imagen:</label>
        <input class="form-control" name="imagen">
      </div>

      <div class="my-2">
        <label class="form-label">Enlace:</label>
        <input
          class="form-control"
          type="url"
          name="enlace"
          placeholder="https://..."
          required
        >
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>

    <a href="/catalogo">Volver</a>
  `;
}

// Formulario para editar contenido
export function createContentFormEditPage(contenido, productoras = []) {
  const id = encodeURIComponent(String(contenido._id));
  const idProductoraActual = String(contenido.productora?._id ?? "");

  const opcionesProductoras = productoras
    .map((productora) => {
      const idProductora = String(productora._id);
      const seleccionada =
        idProductora === idProductoraActual ? "selected" : "";

      return /* html */ `
        <option value="${idProductora}" ${seleccionada}>
          ${productora.nombre}
        </option>
      `;
    })
    .join("");

  return /* html */ `
    <form action="/catalogo/editar/${id}" method="POST">
      <div class="my-2">
        <label class="form-label">Título:</label>
        <input class="form-control" name="titulo" value="${contenido.titulo ?? ""}">
      </div>

      <div class="my-2">
        <label class="form-label">Tipo:</label>
        <input class="form-control" name="tipo" value="${contenido.tipo ?? ""}">
      </div>

      <div class="my-2">
        <label class="form-label">Productora:</label>
        <select class="form-select" name="productora_id" required>
          <option value="">Seleccioná una productora</option>
          ${opcionesProductoras}
        </select>
      </div>

      <div class="my-2">
        <label class="form-label">Género:</label>
        <input class="form-control" name="genero" value="${contenido.genero ?? ""}">
      </div>

      <div class="my-2">
        <label class="form-label">Año:</label>
        <input class="form-control" name="anio" value="${contenido.anio ?? ""}">
      </div>

      <div class="my-2">
        <label class="form-label">Descripción:</label>
        <textarea
          class="form-control"
          name="descripcion"
          rows="4"
          required
        >${contenido.descripcion ?? ""}</textarea>
      </div>

      <div class="my-2">
        <label class="form-label">Imagen:</label>
        <input class="form-control" name="imagen" value="${contenido.imagen ?? ""}">
      </div>

      <div class="my-2">
        <label class="form-label">Enlace:</label>
        <input
          class="form-control"
          type="url"
          name="enlace"
          value="${contenido.enlace ?? ""}"
          placeholder="https://..."
          required
        >
      </div>

      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>

    <a href="/catalogo">Volver</a>
  `;
}

// Confirmación de borrado
export function createDetailDelete(contenido) {
  const id = encodeURIComponent(String(contenido._id));

  return /* html */ `
    <form action="/catalogo/borrar/${id}" method="POST">
      <p>Título: ${contenido.titulo}</p>
      <p>Tipo: ${contenido.tipo}</p>
      <p>Género: ${contenido.genero}</p>
      <p>Año: ${contenido.anio}</p>

      <button type="submit" class="btn btn-danger">Borrar</button>
    </form>

    <a href="/catalogo">Volver</a>
  `;
}
