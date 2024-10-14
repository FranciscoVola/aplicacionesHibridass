const mongoose = require('mongoose');

const CampeonSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  rol: { type: String, required: true },
  dificultad: { type: String, required: true },
  habilidades: { type: [String], required: true }
});

module.exports = mongoose.model('Campeon', CampeonSchema);
