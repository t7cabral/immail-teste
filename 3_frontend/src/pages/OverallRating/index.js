/* Teste para Vaga de Desenvolvimento imMail
 * Desenvolvedor: Thiago Alves Cabral
 * Email: thiago231286@gmail.com
 * Criado em: Miracema-TO, 11 de setembro de 2019 às 08:36 UTC -3
 * 
 * Esse componente é a view
*/

import React, { useState, useEffect } from 'react'
import OverallRatingView from './OverallRatingView'
import api from '../../services/api'


export default () => {

   // States
   const [loading, setLoading] = useState(true); // controle de visualização do Loading
   const [rank, setRank] = useState([]); // guarda a classificação dos jogadores

   // Hook executado quando o component é criado
   useEffect( () => {
      getGameLog(); // chamada busca os dados da API Rest
   }, []);

   // função busca dados de log da API Rest
   const getGameLog = async () => {

      setLoading(true); // ativa o loading na tela

      try {

         const {data} = await api.get('/game/log'); // chamada para o endpoint

         /* Ordenação para obter o Rank */
         const todoKills = [] // guardar kills dos games

         // percorre os dados de retorno da api em busca da chave kills
         data.map( obj => (
            Object.entries(obj.kills).map( ([player, value]) => {
               if( todoKills.hasOwnProperty(player) === false ) {
                  // entra se a chave ainda não não foi adicionada ao array todoKills
                  todoKills[player] = value // adiciona a chave e seu valor inicial
               } else if( todoKills.hasOwnProperty(player) ) {
                  // entra se a chave já existir somando seu valor
                  todoKills[player] = todoKills[player] + value;
               }
            })
         ))
         // ordenando os players pelo maior total de kills
         const rank = Object.entries(todoKills).sort( function(a, b) {
            return parseFloat(b[1]) - parseFloat(a[1]);
         });
         setRank(rank); // atualiza o state rank
      } catch( err ) {
         console.error(err);
      }
      setLoading(false); // desativa loading da tela
   }

   // View
   return (
      <OverallRatingView 
         loading={loading}
         rank={rank}
         getGameLog={getGameLog}
      />
   );
}