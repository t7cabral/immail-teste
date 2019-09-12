/*    Teste para vaga de Desenvolvedor na ImMail
 *
 *    Task 3:
 *        Crie uma API RESTful simples com apenas um endpoint que retorne uma lista
 *        com os resultados vindos do Banco de Dados.
 * 
 *    Data: Miracema/TO, 10 de setembro de 2019 às 15:45 UTC -3
 *    Autor: Thiago Alves Cabral
 *    E-mail: thiago231286@gmail.com
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const gameLogSchema = require('./models/gameLog.js');


// instancia do express
const app = express();

app.use(cors());


/* Conexão com bade de dados - MongoDB Atlas https://cloud.mongodb.com
 * Serviço MongoDB em cloud
 * Database: immail   Collections: gameLog
 * User: thiago       Password: immail123
 */
mongoose.connect('mongodb+srv://thiago:immail123@cluster0-gsysb.mongodb.net/immail?retryWrites=true&w=majority',
  { useNewUrlParser: true,  useUnifiedTopology: true }
);


// endpoint
app.get('/game/log', async (req, res, next) => {

  const GameLog = mongoose.model('GameLog', gameLogSchema, 'gameLog')

  GameLog.find({}, (err, data) => {
    if(err) {
      res.send(err);
      next();
    }
    return res.json(data);
  });

});


// escuta conexões no host 
app.listen(2000, () => {
  console.log('API Rest executando na porta 2000');
});