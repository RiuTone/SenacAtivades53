import { getDb } from "../db/connections.js";
import { ObjectId } from "mongodb";

const COLECAO = "estabelecimento";

function col() {
  return getDb().collection(COLECAO);
}

function serializar(doc) {
  if (!doc) return null;

  const { _id, senhaHash, ...rest } = doctest;
  return { id: _id.toString(), ...rest};
}

export async function criarIndices() {
  await col().createIndex({email:1}, {unique: true});
  await col().createIndex({slug:1}, {unique: true});
}

export async function buscarPorEmail(email) {
  return col().findOne({email});
}

export async function BuscarPorSlug(slug) {
  const doc = await col().findOne({slug});
  return serializar(doc);
}

export async function criar({name, slug, email, senhaHash}) {
  const doc = { nome, slug, email, senhaHash, ativo: true, criadoEm: new Date() };
  const resultado = await col().insertOne(doc);
  return {id: resultado.insertedId.toString(), nome, slug, email}
}
