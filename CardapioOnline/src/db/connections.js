import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let client;
let db;

export async function connectar() {
  if (db) return db;

  client = new MongoClient(url);
  await client.connect();
  db = client.db();

  console.log(`MongoDB conectado ${uri}`);
  return db;
}

export function getDb() {
  if (!db) throw new Error('Banco de dados não inicializado');

  return db;
}
