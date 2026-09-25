# CINERAMA — Catálogo de películas y series

Aplicación web desarrollada para el primer parcial de Aplicaciones Híbridas. Permite administrar un catálogo de películas y series mediante páginas dinámicas y una API REST conectada a MongoDB Atlas.

## Funcionalidades

- Catálogo dividido en secciones por género.
- Detalle individual de cada contenido.
- Alta, modificación y eliminación lógica de contenidos.
- API REST con respuestas en formato JSON.
- Filtros por título, año y género.
- Administración de productoras.
- Relación de una productora con muchos contenidos.
- Imágenes y enlaces externos para cada película o serie.

## Tecnologías

- Node.js
- Express
- MongoDB y MongoDB Atlas
- Driver nativo de MongoDB
- JavaScript con ECMAScript Modules
- HTML y CSS
- Bootstrap

## Instalación y ejecución

1. Descargar o clonar el proyecto.
2. Abrir una terminal dentro de la carpeta del proyecto.
3. Instalar las dependencias:

```bash
pnpm install
```

4. Iniciar el servidor:

```bash
pnpm run dev
```

5. Abrir el catálogo en el navegador:

```text
http://localhost:3333/catalogo
```

## Rutas web

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/catalogo` | Muestra todo el catálogo |
| GET | `/catalogo?genero=Acción` | Filtra el catálogo por género |
| GET | `/catalogo/:id` | Muestra el detalle de un contenido |
| GET | `/catalogo/nuevo` | Muestra el formulario de alta |
| POST | `/catalogo/nuevo` | Guarda un contenido |
| GET | `/catalogo/editar/:id` | Muestra el formulario de edición |
| POST | `/catalogo/editar/:id` | Guarda la edición |
| GET | `/catalogo/borrar/:id` | Muestra la confirmación de borrado |
| POST | `/catalogo/borrar/:id` | Realiza el borrado lógico |

## API del catálogo

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/catalogo` | Obtiene todos los contenidos |
| GET | `/api/catalogo/:id` | Obtiene un contenido por su ID |
| POST | `/api/catalogo` | Crea un contenido |
| PATCH | `/api/catalogo/:id` | Modifica parcialmente un contenido |
| DELETE | `/api/catalogo/:id` | Realiza el borrado lógico |
| PATCH | `/api/catalogo/:id/productora` | Asigna una productora |

### Filtros disponibles

Los filtros se envían mediante parámetros de consulta y pueden combinarse:

```text
GET /api/catalogo?titulo=Spider-Man
GET /api/catalogo?anio=2021
GET /api/catalogo?genero=Acción
GET /api/catalogo?genero=Acción&anio=2021
```

### Ejemplo para crear un contenido

```json
{
  "titulo": "Película de ejemplo",
  "tipo": "Película",
  "genero": "Acción / Aventura",
  "anio": 2024,
  "descripcion": "Descripción del contenido.",
  "imagen": "https://picsum.photos/400/600",
  "enlace": "https://www.themoviedb.org/",
  "productora_id": "ID_DE_LA_PRODUCTORA"
}
```

## API de productoras

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/productoras` | Obtiene todas las productoras |
| GET | `/api/productoras/:id` | Obtiene una productora por su ID |
| POST | `/api/productoras` | Crea una productora |
| GET | `/api/productoras/:id/contenidos` | Obtiene sus películas y series |

### Ejemplo para crear una productora

```json
{
  "nombre": "Productora de ejemplo",
  "descripcion": "Descripción de la productora.",
  "imagen": "https://picsum.photos/600/400"
}
```

## Modelo de datos

Cada contenido guarda una referencia parcial a su productora:

```json
{
  "_id": "ID_DEL_CONTENIDO",
  "titulo": "Título",
  "tipo": "Película",
  "genero": "Acción",
  "anio": 2024,
  "descripcion": "Sinopsis",
  "imagen": "URL_DE_LA_IMAGEN",
  "enlace": "URL_EXTERNA",
  "productora": {
    "_id": "ID_DE_LA_PRODUCTORA",
    "nombre": "Nombre de la productora"
  }
}
```

Una productora puede tener cero o muchos contenidos y cada contenido pertenece a una productora.

## Base de datos

- Base de datos: `AH20232CP1`
- Colección principal: `contenidos`
- Segunda colección: `productoras`

El proyecto utiliza MongoDB Atlas como base de datos en la nube.

## Estructura principal

```text
api/
  controllers/
  routes/
controllers/
page/
public/
routes/
services/
views/
main.js
```

La aplicación separa las responsabilidades entre rutas, controladores, servicios y vistas.
