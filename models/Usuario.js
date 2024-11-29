const { Schema, model } = require('mongoose');

//Esto es el modelo, que le enviaremos a mongoose, con la informacion real, es el patron.
const UsuarioSchema = Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type:String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }

});

module.exports = model('Usuario', UsuarioSchema);