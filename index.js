const express = require('express');
const app = express();
const port = 3000;

// Definindo o middleware para servir arquivos estáticos (como HTML, CSS, JS)
app.use(express.static('public'));

// Rota para exibir o formulário
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/boasvindas.html');
});

// Roda o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
