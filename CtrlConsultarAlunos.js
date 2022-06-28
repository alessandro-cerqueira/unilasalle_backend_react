const db = require("./DaoAluno.js");

module.exports = {
    configurar: async(servidor) => {    
    servidor.get("/", module.exports.obterAlunos);
    servidor.get("/cidades", module.exports.obterCidades);
  },
    
  obterAlunos: async (request, reply) => {
    let resposta = await db.obterAlunos();
    console.log('Requisição feita - Obter Alunos:' + resposta);
    reply.code(200)
         .header('Content-Type', 'application/json; charset=utf-8')
         .header('Access-Control-Allow-Origin', '*')
         .send(resposta);
  },

  obterCidades: async (request, reply) => {
    let resposta = await db.obterCidades();
    console.log('Requisição feita - Obter Cidades:' + resposta);
    reply.code(200)
         .header('Content-Type', 'application/json; charset=utf-8')
         .header('Access-Control-Allow-Origin', '*')
         .send(resposta);
  }
  //---------------------------------------------------------------------//
};
