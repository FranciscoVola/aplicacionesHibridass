const express = require('express');
const conectarDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
conectarDB();

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


// Rutas
app.use('/api/campeones', require('./routes/campeonRutas'));
app.use('/api/auth', require('./routes/authRutas'));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
