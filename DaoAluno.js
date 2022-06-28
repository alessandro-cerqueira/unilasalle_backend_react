/**
 * Módulo para manipular o banco de dados SQLite
 */

// Para acesso ao FileSystem
const fs = require("fs");

// Inicialização do Banco de Dados
const dbFile = "./.data/aluno.db";
const dbExiste = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
let db;

// Solicitando a abertura do Banco de Dados
sqlite.open({ filename: dbFile, driver: sqlite3.Database})
  .then(async dBase => {
    db = dBase;
    try {
      if (!dbExiste) {
        await db.run(
          "CREATE TABLE Aluno(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR[40], idade INTEGER, idCidade INTEGER)"
        );
          
        await db.run(
          "CREATE TABLE Cidade (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR[20])"
        );

        // Adiciono quais são as linguagens da votação
        await db.run(
          "INSERT INTO Cidade (nome) VALUES ('Rio de Janeiro'), ('Niterói'), ('Maricá'), ('São Gonçalo')"
        );          
      } else {
        console.log(await db.all("SELECT * from Aluno"));
      }
    } catch (dbError) {
      console.error(dbError);
    }
  });

module.exports = {
  obterCidades: async () => {
    try {
      return await db.all("SELECT * from Cidade");
    } catch (dbError) {
      console.error(dbError);
      return [];
    }
  },

  obterAlunos: async () => {
    try {
      let retorno =  await db.all("SELECT a.id as Id, a.nome as Nome, a.idade as Idade, c.nome as Cidade from Aluno a INNER JOIN Cidade c on a.idCidade = c.id");
      console.log(retorno);
      return retorno;
    } catch (dbError) {
      console.error(dbError);
      return [];
    }
  },

  incluirAluno: async (nome, idade, idCidade) => {
    try {
      let retorno = await db.run("INSERT INTO Aluno (nome, idade, idCidade) VALUES (?, ?, ?)", 
                     [nome, idade, idCidade]);  
      console.log('incluir : ' + retorno);
      return retorno;
    } catch (dbError) {
      console.error(dbError);
    }
  },

  alterarAluno: async (id, nome, idade, idCidade) => {
    try {
      let retorno = await db.run("UPDATE Aluno set nome = ?, idade = ?, idCidade = ? WHERE id = ?", 
                     [nome, idade, idCidade,id]);  
      return retorno;
    } catch (dbError) {
      console.error(dbError);
    }
  },

  excluirAluno: async (id) => {
    try {
      await db.run("DELETE from Aluno WHERE id = ?", 
                     [id]);  
      return true;
    } catch (dbError) {
      console.error(dbError);
    }
  }
}
