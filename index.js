const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config');

//Crear el servidor de Express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors({
  origin: 'http://localhost:5173', // Reemplaza con la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true // Si necesitas enviar cookies o encabezados de autenticación
}));


//Directorio publico
app.use( express.static('public') );


//Lectura y parseo del body
app.use( express.json()); //middleware


//Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${4001}`);
} );

