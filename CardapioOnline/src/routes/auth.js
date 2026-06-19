import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as Estabelecimento from "../models/Estabelecimento.js";


const router = Router();

/**
  * @param (String) name
*/
function gerarSlug(name) {
  name.toLocaleLowerCase().normalize("NFD");
  ;
  
}
