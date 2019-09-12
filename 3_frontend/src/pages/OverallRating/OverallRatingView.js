/* Teste para Vaga de Desenvolvimento imMail
 * Desenvolvedor: Thiago Alves Cabral
 * Email: thiago231286@gmail.com
 * Criado em: Miracema-TO, 11 de setembro de 2019 às 15:28 UTC -3
 * 
 * Esse componente é a view
*/

import React from 'react'

import Loading from '../../components/Loading'

import imgLogoQuake from '../../assets/images/logo-quaker3.jpg'

import { makeStyles } from '@material-ui/core/styles'
import { Typography, Divider } from '@material-ui/core'

// CSS Custom
const useStyles = makeStyles(theme => ({
   rootGameView: {
     flexGrow: 1,
     minHeight: '42vh',
   },
   containerRank: {
     fontFamily: 'monospace',
     borderRadius: "2px",
     boxShadow: "2px 2px 2px #3db13c57",
     textAlign: 'center',
     color: "#d3d3e6",
   
     backgroundColor: "#000",
     backgroundRepeat: 'no-repeat',
     backgroundAttachment: 'fixed',
     backgroundPosition: 'center center',
     padding: '0 30px 30px 30px',
   },
   tableRanking: {
      fontFamily: 'monospace',
      fontSize: '20px',
      width: '100%',
   },
   inf0data: {
      fontFamily: 'monospace',
      textAlign: 'center',
      width: '100%',
   },
   btnRefresh: {
      padding: '5px',
      border: '1px solid #333',
      cursor: 'pointer',
   },
}))


export default (props) => {

   // pega o CSS customizado
   const classes = useStyles();

   return (
      <div>
         <Typography variant="h6" component="h4" display="block">Quake Arena 3 - Ranking Geral de Kills por Jogador</Typography>
         <Divider />
         <br />

         { props.loading
         ?  <Loading />
         :  <div className={classes.rootGameView}>
               { props.rank.length > 0
                  ?  <div className={classes.containerRank}>
                        <img src={imgLogoQuake} alt="Logo Quake 3" />
                        <table className={classes.tableRanking}>
                           <thead>
                              <tr style={{fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'Helvetica', fontSize: '20px', color: '#d66565' }}>
                                 <th style={{textAlign: 'left'}}>Player</th>
                                 <th>Total Kills</th>
                                 <th>Rank</th>
                              </tr>
                           </thead>
                           <br />
                           <tbody>
                              {
                                 props.rank.map( ([player, value], index) => (
                                    <tr key={player}>
                                       
                                       <td style={{textAlign: 'left'}}>{player}</td>
                                       <td>{value}</td>
                                       <td>{index+1}°</td>
                                    </tr>
                                 ))
                              }
                           </tbody>
                        </table>
                     </div>
                  :  <div className={classes.inf0data}>
                        <div>Nenhum registro encontrado.</div>
                        <br />
                        <span onClick={props.getGameLog} className={classes.btnRefresh}>atualizar</span>
                     </div>
               }
            </div>
         }
      </div>
   )
}