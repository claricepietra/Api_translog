const express = require("express")
const router = express.Router();
const VeiculoController = require("../controllers/VeiculoController.js");

router.get("/Veiculos", VeiculoController.listar);
router.get("/Veiculos/:id", VeiculoController.buscarPorId);
