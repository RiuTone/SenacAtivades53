import { getDb } from "../db/connections.js";
import { ObjectId } from "mongodb";

const COLECAO = "categoria"

function col() {
  return getDb().collection(COLECAO);
}

export async function criarIndices() {
  await col().createIndex({email:1}, {unique: true});
  await col().createIndex({slug:1}, {unique: true});
}

function serializar(doc) {
  if (!doc) return null;

  const { _id, estabelecimento, ...rest} = doc;
  return {id: _id.toString(), estabelecimento: estabelecimentoId.toString(), ...rest};
}

export async function listar(estabelecimento) {
  const docs = await col()
  .find({ estabelecimentoId: new ObjectId(estabelecimento) })
  .sort({ ordem: 1, criadoEm: 1})
  .toArray();

  return docs.map(serializar);
}

export async function buscarPorId(id, estabelecimento) {
  const doc = await col().findOne({
    _id: new ObjectId(id),
    estabelecimento: new ObjectId(estabelecimento)
  })

  return serializar(doc);
}
