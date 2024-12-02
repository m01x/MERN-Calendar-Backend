const { Schema, model } = require('mongoose');

//Esto es el modelo, que le enviaremos a mongoose, con la informacion real, es el patron.
const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = model('Usuario', UsuarioSchema);