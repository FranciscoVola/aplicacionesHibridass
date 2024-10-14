//CONEXION A LA BASE DE DATOS, ESTOY USANDO MONGO DB//
const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a la base de datos correctamente uwu');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
