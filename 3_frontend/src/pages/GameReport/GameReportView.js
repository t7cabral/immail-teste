/* Teste para Vaga de Desenvolvimento imMail
 * Desenvolvedor: Thiago Alves Cabral
 * Email: thiago231286@gmail.com
 * Criado em: Miracema-TO, 11 de setembro de 2019 às 02:53 UTC -3
 * 
 * Esse componente é a view
*/

import React from 'react'

import imgQuake from '../../assets/images/bg0-q3.jpg'
import Loading from '../../components/Loading'

import { makeStyles } from '@material-ui/core/styles'
import { Typography, Divider, Grid } from '@material-ui/core'


// CSS Custom
const useStyles = makeStyles(theme => ({
   rootGameView: {
     flexGrow: 1,
     minHeight: '42.4vh',
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
   tableRanking: {
      margin: 0,
      marginTop: '15px',
      fontFamily: 'monospace',
      width: '100%',
   },
   totais: {
      fontFamily: 'monospace',
      padding: '2px 0',
   },
   containerGame: {
      fontFamily: 'monospace',
      minHeight: '45vh',
      marginTop: '15px',
      borderRadius: "2px",
      padding: '15px',
      boxShadow: "2px 2px 2px #3db13c57",
      textAlign: 'center',
      color: "#d3d3e6",
      backgroundImage: `url('${imgQuake}')`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center center',
   },
   titulo: {
      textTransform: 'uppercase',
      display: 'block',
      color: '#d66565',
   }
 }))


export default (props) => {

   // pega o CSS customizado
   const classes = useStyles();

   return (
      <div>

         <Typography variant="h6" component="h4" display="block">Quake Arena 3 - Relatório de Cada Jogo</Typography>
         <Divider />

         <br />

         {props.loading

         ?  <Loading />
         :  <div className={classes.rootGameView}>
               <Grid container spacing={1}>
                  {
                     props.gameLog.length > 0

                     ? props.gameLog.map( (item, key) => (
                        <Grid item xs={12} sm={12} md={4} lg={3} key={key} >
                           <div className={classes.containerGame}>
                              <Typography className={classes.titulo} variant="h6" component="span">{item.game_name.replace('_', ' ')}</Typography>
                              <br />

                              <div className={classes.totais}>Total Players: {item.players.length}</div>
                              <div className={classes.totais}>Total Deaths: {item.total_kills}</div>

                              {Object.keys(item.kills).length > 0
                                 ?  <table className={classes.tableRanking}>
                                       <thead>
                                          <tr style={{ fontWeight: 'bold', color: '#FFF' }}>
                                             <th>Player</th>
                                             <th>Score</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          {Object.entries(item.kills).map( ([player, value]) => (
                                             <tr style={{ textAlign: 'center' }} key={player}>
                                                <td>{player}</td>
                                                <td>{value}</td>
                                             </tr>
                                          ))}
                                       </tbody>
                                    </table>
                                 :  ''
                              }
                           </div>
                        </Grid>
                        ))
                     : <div className={classes.inf0data}>
                           <div>Nenhum registro encontrado.</div>
                           <br />
                           <span onClick={props.getGameLog} className={classes.btnRefresh}>atualizar</span>
                        </div>
                  }
               </Grid>
            </div>
         }
      </div>
   )
}