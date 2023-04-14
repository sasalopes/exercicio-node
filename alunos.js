
const alunos = [
    { nome: 'Sabrina', idade: 34, media: 9.0 },
    { nome: 'Luisa', idade: 21, media: 9.0 },
    { nome: 'José', idade: 33, media: 6.0 },
    { nome: 'Júlia', idade: 18, media: 7.0 }
  ];

  function filtrarPorNome(nome) {
    return alunos.filter(aluno => aluno.nome.startsWith(nome));
  }

  function filtrarPorMedia(media) {
    return alunos.filter(aluno => aluno.media >= media);
}

  function adicionarAluno(novoAluno) {
    alunos.push(novoAluno);
    
  }
 

  function atualizarAluno(index, nome, media) {
    if (nome !== undefined) {
      alunos[index].nome = nome;
    }    
    if (media !== undefined) {
      alunos[index].media = media;
    }
  }


  function deletarAluno(index) {
    alunos.splice(index, 1);
  }

  
  module.exports = {
    alunos,
    filtrarPorNome,
    filtrarPorMedia,
    adicionarAluno,
    deletarAluno,
    atualizarAluno,
     };

