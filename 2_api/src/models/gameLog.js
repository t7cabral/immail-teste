const mongoose = require('mongoose');

const gameLogSchema = new mongoose.Schema({
   game_name: { type: String },
   total_kills: { type: Number },
   players: { type: Array },
   kills: { type: Object }
 });

 module.exports = gameLogSchema;