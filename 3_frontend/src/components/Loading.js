import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImgLoading from '../assets/images/loading.gif';


/* Custom CSS */
const useStyles = makeStyles(theme => ({
   root: {
      textAlign: 'center',
   },
   imgLoading: {
      position:  'relative',
   },
}));


export default () => {

   const classes = useStyles();

   return (
      <div className={classes.root}>
         <img className={classes.imgLoading} src={ImgLoading} alt="Loagind..." />
      </div>
   );
}