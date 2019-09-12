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

try {
   // conexão com MongoDB
   mongoose.connect('mongodb+srv://thiago:immail123@cluster0-gsysb.mongodb.net/immail?retryWrites=true&w=majority',
      { useNewUrlParser: true,  useUnifiedTopology: true }
   );
} catch (err) {
   console.log(err)
   process.exit(1)
}


// lendo arquivo game.log
let rl = readline.createInterface({
   input: fs.createReadStream('./src/games.log', {encoding: 'utf8'})
});


// Variáveis
let game = {}
let gameNo = 0
let gameName = ''
let gameKill = 0
let gamePlayers = []
let gamePlayerKill = []
let gameOpen = false


// evento emitido após cada linha
rl.on('line', function(line) {

   if( line.indexOf("InitGame:") !== -1 && gameOpen == true ) {
      /* entra quando encontra a flag de nova partida "InitGame:" e existe uma partida aberta "gameOpen == true"  */

      // salva partida atual
      game[gameName] = {
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
      /* entra quando encontra a flag de nova partida "InitGame:" e NÃO existe partida aberta "gameOpen == false"  */

      // cria nova partida
      gameNo++ // incrementa a variável
      gameName = "game_"+gameNo
      gameKill = 0
      gamePlayers = []
      gamePlayerKill = []
      gameOpen = true

   } else if( line.indexOf("ShutdownGame:") !== -1 ) {
      /* entra quando encontra a flag de fechamendo da partida "ShutdownGame:" */

      // salva partida atual
      game[gameName] = {
         'total_kills': gameKill,
         'players': gamePlayers,
         'kills': gamePlayerKill
      }

      // sinaliza que a partida foi fechada e limpa as variáveis
      gameKill = 0
      gamePlayers = []
      gamePlayerKill = []
      gameOpen = false
   }

   
   // get players
   if( line.indexOf('ClientUserinfoChanged:') !== -1 ) {
      
      /* Divido "split" a string buscando o caractere \ "barra invertida", em seguida pego o segundo
       * elemento que é onde contem o nome do jodagor.
      */
      player = line.split("\\")[1].trim()

      // adiciona o jogador na lista de jogadores
      if (gamePlayers.includes(player) === false) gamePlayers.push(player);

      // adiciona o jogador no contador de kill atribuindo o valor 0 de início
      if( !gamePlayerKill.hasOwnProperty(player) ) {
         gamePlayerKill[player] = 0
      }

   }

   // contagem dos Kill
   if( line.indexOf("Kill:") !== -1 ) {

      // contador geral de kill "todas as mortes são contabilizadas aqui, inclusive mortes pelo <world>"
      gameKill++

      // contador específico de kill "por jogador"
      sepKilled = line.split('killed') // divido a string pela palavra "killed"
      author = sepKilled[0].split(':')[3].trim() // divido pelo caractere ":" e pego o autor (quem matou)
      victim = sepKilled[1].split('by')[0].trim() // divido pelo caractere "by" e pego a vitima (quem morreu)

      // adiciona o autor (quem matou) na lista de kills se ele for diferente de <world>.
      // atenção: <world> não entra nessa contagem individuais de kills
      if( !gamePlayerKill.hasOwnProperty(author) && author !== '<world>' ) {
         gamePlayerKill[author] = 0 // inicializa o jogador com valor 0
      }

      // adiciona o jogador vítima (quem morreu) na lista de contagem de kills com valor inicial 0
      if( !gamePlayerKill.hasOwnProperty(victim) ) {
         gamePlayerKill[victim] = 0
      }

      // adiciona 1 ponto para o autor (quem matou) caso ele seja diferente de <world>
      if( author !== '<world>' ) {
         gamePlayerKill[author] = gamePlayerKill[author] + 1
      }

      // subtrai 1 ponto da vitima (quem morreu) se o autor (quem matou) for o <world>
      if( author === '<world>' ) {
         gamePlayerKill[victim] = gamePlayerKill[victim] - 1
      }

   }

});


// evento emitido quando se completa a leitura do arquivo game.log
rl.on('close', function(line) {

   // get conexão com MongoDB
   let con = mongoose.connection;

   // quantidade de partidas
   const totalGame = Object.keys(game).length

   // loop de partidas
   Object.entries(game).forEach( (item, key) => {

      let objPlayerKill = Object.assign({}, item[1].kills)

      try {

         // salva/atualiza a partida no banco de dados
         con.collection('gameLog').updateOne(
            { game_name: item[0] },
            { $set: {
                  game_name: item[0],
                  total_kills: item[1].total_kills,
                  players: item[1].players,
                  kills: objPlayerKill
               }
            },
            {
               upsert: true
            },
            (err, doc) => {
               // callback
               console.log('Partida ',key+1,' de ',totalGame, ' salvo com sucesso!')
            }
         )

      } catch (err) {
         console.error(err)
      }

   })
   
})