/*    Teste para vaga de Desenvolvedor na ImMail
 *
 *    Task 1:
 *       Construa um parser para o arquivo de log games.log utilizando Node.js.
 *       O arquivo games.log é gerado pelo servidor de quake 3 arena. Ele registra todas as
 *       informações dos jogos, quando um jogo começa, quando termina, quem matou quem, quem
 *       morreu pq caiu no vazio, quem morreu machucado, entre outros. O parser deve ser capaz
 *       de ler o arquivo, agrupar os dados de cada jogo, e em cada jogo deve coletar as
 *       informações de morte.
 *
 *     Task 2:
 *       Após construir o parser, salve as informações no MongoDB. Fique a vontade pra construir
 *        o modelo de dados que achar mais adequado.
 *      
 *    Data: Miracema/TO, 09 de setembro de 2019 às 03:12 UTC -3
 *    Autor: Thiago Alves Cabral
 *    E-mail: thiago231286@gmail.com
 */


const fs = require('fs')
const readline = require('readline')
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://thiago:immail123@cluster0-gsysb.mongodb.net/immail?retryWrites=true&w=majority',
   { useNewUrlParser: true,  useUnifiedTopology: true }
);






let rl = readline.createInterface({
   input: fs.createReadStream('./src/games.log', {encoding: 'utf8'})
});

let xx = {}
let gameNo = 0
let gameName = ''
let gameKill = 0
let gamePlayers = []
let gamePlayerKill = []
let gameOpen = false

// event is emitted after each line
rl.on('line', function(line) {


   // verifica inicio de partida e se partida atual esta aberta
   if( line.indexOf("InitGame:") !== -1 && gameOpen == true ) {
      /* Verdadeiro quando é encontrada uma partida nova com uma em aberto  */

      // salva partida atual
      xx[gameName] = {
            'total_kills': gameKill,
            'players': gamePlayers,
            'kills': gamePlayerKill
      }

      // cria nova partida
      gameNo++ // incrementa a variável
      gameName = "game_"+gameNo
      gameKill = 0
      gamePlayers = []
      gamePlayerKill = []
      gameOpen = true
   } else if(  line.indexOf("InitGame:") !== -1 && gameOpen == false) {
      /* Verdadeiro quando não há partidas abertas */

      // cria nova partida
      gameNo++ // incrementa a variável
      gameName = "game_"+gameNo
      gameKill = 0
      gamePlayers = []
      gamePlayerKill = []
      gameOpen = true
   } else if( line.indexOf("ShutdownGame:") !== -1 ) {
      /* Verdadeiro quando encontra o fechamendo da partida. */

      // salva partida atual
      xx[gameName] = {
         'total_kills': gameKill,
         'players': gamePlayers,
         'kills': gamePlayerKill
      }

      // sinaliza que a partida foi fechada e limpa os kill da mesma
      gameOpen = false
      gamePlayers = []
      gamePlayerKill = []
      gameKill = 0
   }
   
   // get players
   if( line.indexOf('ClientUserinfoChanged:') !== -1 ) {
      
      /* Divido "split" a string buscando o caractere \ "barra invertida", em seguida pego o segundo
       * elemento que é onde contem o nome do jodagor.
      */
      player = line.split("\\")[1].trim()

      // verifica se jogador está na lista antes de adicionar
      if (gamePlayers.includes(player) === false) gamePlayers.push(player);

      if( !gamePlayerKill.hasOwnProperty(player) ) {
         gamePlayerKill[player] = 0
      }

   }

   // contagem dos Kill
   if( line.indexOf("Kill:") !== -1 ) {

      // contador geral de kill
      gameKill++


      // contador específico de kill
      sepKilled = line.split('killed')
      author = sepKilled[0].split(':')[3].trim()
      victim = sepKilled[1].split('by')[0].trim()

      if( !gamePlayerKill.hasOwnProperty(author) && author !== '<world>' ) {
         gamePlayerKill[author] = 0
      }

      if( !gamePlayerKill.hasOwnProperty(victim) ) {
         gamePlayerKill[victim] = 0
      }

      if( author !== '<world>' ) {
         gamePlayerKill[author] = gamePlayerKill[author] + 1
      }

      if( author === '<world>' ) {
         gamePlayerKill[victim] = gamePlayerKill[victim] - 1
      }

      //process.exit(1)

   }

});


// end
rl.on('close', function(line) {

   
   let con = mongoose.connection;

   Object.entries(xx).forEach( (item, key) => {

      let objPlayerKill = Object.assign({}, item[1].kills)

      con.collection('gameLog').updateOne(
         { game_name: item[0] },
         { $set: {
               game_name: item[0],
               total_kills: item[1].total_kills,
               players: item[1].players,
               kills: objPlayerKill
            }
         },
         { upsert:true }
      )
   })
   
})



