require('dotenv').config(); 

const express = require('express');
const path = require('path');

const verificarAccept = require('./src/middlewares/verificarAccept');
const veiculoRoutes = require('./src/routes/veiculoRoutes');
const VeiculoView = require('./src/views/VeiculoView');

const app = express();
const PORT = process.env.PORT || 3000;

// Entrega da pasta estática (public/index.html, css/, js/)
app.use(express.static(path.join(__dirname, 'public')));

// Tradutor de JSON (body)
app.use(express.json());

// Middleware de segurança: só aceita clientes que aceitam application/json
app.use('/api', verificarAccept);

// Rotas sob o prefixo /api
app.use('/api', veiculoRoutes);

// Barreira final: rota inexistente devolve 404 em JSON
app.use((req, res) => {
  res.status(404).json(VeiculoView.formatarErro(404, 'Rota não encontrada.'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});