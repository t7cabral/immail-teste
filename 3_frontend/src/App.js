import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import GameReport from './pages/GameReport'
import OverallRating from './pages/OverallRating'
import AppMenu from  './components/AppMenu'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#8c939c38',
  }
}));


function App() {

  const classes = useStyles();

  return (
    <BrowserRouter>


      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={4} sm={4} md={2}>
            
              <AppMenu />
          </Grid>
          <Grid item xs={8} sm={8} md={10}>
            <Paper className={classes.paper}>
              <Switch>
                <Route exact path="/" component={ GameReport } />
                <Route exact path="/overall-rating" component={ OverallRating } />
              </Switch>
            </Paper>
          </Grid>
        </Grid>






        


      </Container>
    </BrowserRouter>
  );
}

export default App;
