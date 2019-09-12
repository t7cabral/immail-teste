import React from 'react'
import { Link } from 'react-router-dom'

/* Icons material-ui */
import IconReceipt from '@material-ui/icons/Receipt'
import IconRank from '@material-ui/icons/Flag'

/* Components material-ui */
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'


export default () => {

   return (
      <div>
         <List>

            <ListItem button component={Link} to="/">
               <ListItemIcon><IconReceipt /></ListItemIcon>
               <ListItemText primary="Relatório"/>
            </ListItem>

            <ListItem button component={Link} to="/overall-rating">
               <ListItemIcon><IconRank /></ListItemIcon>
               <ListItemText primary="Rank Kills"/>
            </ListItem>

         </List>
      </div>
   );
}