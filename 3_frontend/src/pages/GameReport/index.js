/* Teste para Vaga de Desenvolvimento imMail
 * Desenvolvedor: Thiago Alves Cabral
 * Email: thiago231286@gmail.com
 * Criado em: Miracema-TO, 11 de setembro de 2019 às 02:17 UTC -3
 * 
 * Esse componente contém a lógica da página GameReportView
*/

import React, { useState, useEffect } from 'react'
import GameReportView from './GameReportView'
import api from '../../services/api'


export default () => {

   // States
   const [loading, setLoading] = useState(true); // controle de visualização do Loading
   const [gameLog, setGameLog] = useState([]) // guarda os dados de log do jogo

   // Hook executado quando o component é criado
   useEffect( () => {
      getGameLog(); // chamada busca os dados da API Rest
   }, []);

   // função busca dados de log da API Rest
   const getGameLog = async () => {
      setLoading(true); // ativa o loading na tela
      try {
         const {data} = await api.get('/game/log'); // chamada para o endpoint
         setGameLog(data); // atualiza o state gameLog
      } catch( err ) {
         console.error(err);
      }
      setLoading(false); // desativa loading da tela
   }

   // View
   return (
      <GameReportView 
         loading={loading}
         gameLog={gameLog}
         getGameLog={getGameLog}
      />
   );
}