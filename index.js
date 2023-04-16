const express = require("express");
const alunos = require('./alunos');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
app.use(morgan('combined'));
app.use(express.json());

app.get('/alunos', (req, res) => {
  let listaAlunos = alunos.alunos;

  if (req.query.nome) {
    listaAlunos = alunos.filtrarPorNome(req.query.nome);
  }

  if (req.query.media) {
    listaAlunos = alunos.filtrarPorMedia(req.query.media);
  }

  res.json(listaAlunos);
});

app.post('/alunos/novo', (req, res) => {
  const {nome, matricula, media} = req.body;

  if (!nome || !matricula || !media) {
    return res.status(400).json({ error: 'Os campos nome, matricula e media são obrigatórios.' });
  }

  novoAlunos = [nome, matricula, media]
  fs.writeFileSync("db.json", JSON.stringify(alunos));
  

  alunos.adicionarAluno(novoAlunos)
  console.log(alunos);
  res.json('Aluno adicionado com sucesso!');

    
});

app.delete('/alunos/deletar/:index', (req, res) => {
  const index = req.params.index;
  if (isNaN(index) || index < 0 || index >= alunos.alunos.length) {
    return res.status(404).json({ error: 'Índice inválido.' });
  }

  alunos.deletarAluno(index)
  fs.writeFileSync("db.json", JSON.stringify(alunos));
  console.log(alunos)
  res.json("Deletado")

 });

app.put('/alunos/atualizar/:index', (req, res) => {
  const index = req.params.index;
  const nome = req.query.nome
  const media = req.query.media
  console.log(index)

  if (isNaN(index) || index < 0 || index >= alunos.alunos.length) {
    return res.status(404).json({ error: 'Índice inválido.' });
  }

  alunos.atualizarAluno(index, nome, media)
  fs.writeFileSync("db.json", JSON.stringify(alunos));
  res.json("Atualizado")

  
});

app.listen(7000, () => {
  console.log('Servidor iniciado na porta 7000');
});

