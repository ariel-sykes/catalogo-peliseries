import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI = "mongodb+srv://ariel:ariel@cluster0.tqwbqhc.mongodb.net/?appName=Cluster0";

const client = new MongoClient(MONGO_URI);
const db = client.db("AH20232CP1");

export async function getProductoras() {
  const productoras = await db.collection("productoras").find().toArray();

  return productoras;
}

export async function saveProductora(productora) {
  await db.collection("productoras").insertOne(productora);

  return productora;
}

export async function getProductoraById(id) {
  const productora = await db.collection("productoras").findOne({
    _id: new ObjectId(id),
  });

  return productora;
}

export async function getProductoraContents(idProductora) {
  const contenidos = await db
    .collection("contenidos")
    .find({
      "productora._id": new ObjectId(idProductora),
      eliminado: { $ne: true },
    })
    .toArray();

  return contenidos;
}
