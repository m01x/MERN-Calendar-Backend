const express = require('express');
require('dotenv').config();

//Crear el servidor de Express
const app = express();



//Directorio publico
app.use( express.static('public') );


//Lectura y parseo del body
app.use( express.json()); //middleware


//Rutas
/**
 * TODO: auth / Crear / Login / Renew
 * TODO: CRUD evento
 */

app.use('/api/auth', require('./routes/auth'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${4001}`);
} );

