const express = require("express");
const alunos = require('./alunos');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined', {stream: accessLogStream}));
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

  alunos.adicionarAluno(novoAlunos)
  res.json('Aluno adicionado com sucesso!');

    
});

app.delete('/alunos/deletar/:index', (req, res) => {
  const index = req.params.index;
  if (isNaN(index) || index < 0 || index >= alunos.alunos.length) {
    return res.status(404).json({ error: 'Índice inválido.' });
  }

  alunos.deletarAluno(index)
  res.json("Aluno deletado com sucesso!")

 });

app.put('/alunos/atualizar/:index', (req, res) => {
  const index = req.params.index;
  const nome = req.query.nome
  const media = req.query.media

  if (isNaN(index) || index < 0 || index >= alunos.alunos.length) {
    return res.status(404).json({ error: 'Índice inválido.' });
  }

  alunos.atualizarAluno(index, nome, media)
  res.json("Aluno atualizado com sucesso")

  
});

app.listen(7000, () => {
  console.log('Servidor iniciado na porta 7000');
});

