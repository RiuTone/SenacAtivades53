import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as Estabelecimento from "../models/Estabelecimento.js";


const router = Router();

/**
  * @param (String) name
*/
function gerarSlug(name) {
  return name
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function gerarToken(estabelecimento) {
  return jwt.sign(
    {id: estabelecimento.id, nome: estabelecimento.nome, slug: estabelecimento.slug},
    process.env.JWT_SECRET,
    {expiresIn: '7d'}
  )
}

router.post('/cadastro', async (req, res) => {
  const {nome, email, senha} = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Campos obrigatórios: nome, email, senha' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ erro: 'A senha deve ter no mínimo 6 caracteres' })
  }

  const existente = await Estabelecimento.buscarPorEmail(email);

  if (existente) {
    return res.status(409).json({ erro: 'E-mail já cadastrado'});
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const slugBase = gerarSlug(nome);
  const slug = `${slugBase}-${Date.now().toString(36)}`

  const estabelecimento = await Estabelecimento.criar({ nome, slug, email, senhaHash});
  const token = gerarToken(estabelecimento);

  res.status(201).json({token, estabelecimento});
});

router.post('/login', async (req, res) => {
  const {email, senha} = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Campos obrigatórios: email e senha' });
  }

  const doc = await Estabelecimento.buscarPorEmail(email);
  if (!doc) {
    return res.status(401).json({ erro: 'E-mail ou senha incorretos'});
  }

  const senhaCorreta = await bcrypt.compare(senha, doc.senhaHash);
  if (!senhaCorreta) {
    return res.status(401).json({ erro: 'Senha incorreta'})
  }

  const estabelecimento = { id: doc._id.toString(), nome: doc.nome, slug: doc.slug, email: doc.email}
  const token = gerarToken(estabelecimento);

  res.status(200).json({token, estabelecimento})
})

export default router;
