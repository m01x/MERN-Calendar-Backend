const express = require('express');

//Crear el servidor de Express
const app = express();


//Rutas
app.get('/', ( req, res ) => {

  console.log('se requiere el /');
  
  res.json({
    ok: true
  });

});


//Escuchar peticiones
app.listen( 4001, () => {
  console.log(`Servidor corriendo en puerto ${4001}`);
} );

