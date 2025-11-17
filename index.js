const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Só pra você ver o que está acontecendo
let nomeUsuario = '';

// Middleware para arquivos estáticos (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para ler dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota da página inicial (home)
app.get('/', (req, res) => {
  console.log('GET /  -> home.html');
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Rota que recebe o nome e redireciona
app.post('/entrar', (req, res) => {
  const nome = (req.body.nome || '').trim();
  console.log('POST /entrar  nome:', nome);

  if (!nome) {
    console.log('Nome vazio, redirecionando para /');
    return res.redirect('/');
  }

  nomeUsuario = nome;
  console.log('Nome guardado em nomeUsuario =', nomeUsuario);

  res.redirect('/bem-vindo?nome=' + encodeURIComponent(nome));
});

// Rota da tela de boas-vindas
app.get('/bem-vindo', (req, res) => {
  console.log('GET /bem-vindo  nomeUsuario:', nomeUsuario);

  // Proteção extra: se não tiver nome, volta pra /
  if (!nomeUsuario) {
    console.log('Sem nomeUsuario, redirecionando para /');
    return res.redirect('/');
  }

  res.sendFile(path.join(__dirname, 'public', 'bemvindo.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
