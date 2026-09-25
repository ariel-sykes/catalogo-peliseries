import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = "mongodb+srv://ariel:ariel@cluster0.tqwbqhc.mongodb.net/?appName=Cluster0";

const client = new MongoClient(MONGO_URI);
const db = client.db("AH20232CP1");

export async function getCatalog(filtros = {}) {
  const filtro = { eliminado: { $ne: true } };

  if (filtros.anio) {
    filtro.anio = parseInt(filtros.anio);
  }

  if (filtros.titulo) {
    filtro.titulo = {
      $regex: filtros.titulo,
      $options: "i",
    };
  }

  if (filtros.genero) {
    filtro.genero = {
      $regex: filtros.genero,
      $options: "i",
    };
  }

  const catalogo = await db.collection("contenidos").find(filtro).toArray();

  return catalogo;
}

export async function getCatalogById(id) {
  const contenido = await db.collection("contenidos").findOne({
    _id: new ObjectId(id),
  });

  return contenido;
  // const catalogo = await getCatalog();
  // return catalogo.find((contenido) => contenido.id == id);
}

export async function saveContent(contenido) {
  const { productora_id, ...datosContenido } = contenido;

  if (!ObjectId.isValid(productora_id)) {
    throw new Error("Productora inválida");
  }

  const productora = await db.collection("productoras").findOne({
    _id: new ObjectId(productora_id),
  });

  if (!productora) {
    throw new Error("Productora no encontrada");
  }

  const nuevoContenido = {
    ...datosContenido,
    anio: parseInt(datosContenido.anio),
    productora: {
      _id: productora._id,
      nombre: productora.nombre,
    },
  };

  await db.collection("contenidos").insertOne(nuevoContenido);

  return nuevoContenido;
}

export async function editContent(id, contenido) {
  const { productora_id, ...datosContenido } = contenido;

  const contenidoActualizado = {
    ...datosContenido,
  };

  if (datosContenido.anio) {
    contenidoActualizado.anio = parseInt(datosContenido.anio);
  }

  if (productora_id) {
    if (!ObjectId.isValid(productora_id)) {
      throw new Error("Productora inválida");
    }

    const productora = await db.collection("productoras").findOne({
      _id: new ObjectId(productora_id),
    });

    if (!productora) {
      throw new Error("Productora no encontrada");
    }

    contenidoActualizado.productora = {
      _id: productora._id,
      nombre: productora.nombre,
    };
  }

  await db.collection("contenidos").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: contenidoActualizado,
    },
  );

  return getCatalogById(id);
}

export async function deleteContentLogico(id) {
  await db
    .collection("contenidos")
    .updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } });

  return getCatalogById(id);
}

export async function assignProductora(idContenido, idProductora) {
  const productora = await db.collection("productoras").findOne({
    _id: new ObjectId(idProductora),
  });

  if (!productora) {
    return null;
  }

  const productoraParcial = {
    _id: productora._id,
    nombre: productora.nombre,
  };

  const resultado = await db.collection("contenidos").updateOne(
    {
      _id: new ObjectId(idContenido),
    },
    {
      $set: {
        productora: productoraParcial,
      },
    },
  );

  if (resultado.matchedCount === 0) {
    return null;
  }

  return getCatalogById(idContenido);
}
