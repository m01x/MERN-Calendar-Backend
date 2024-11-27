const { response } = require('express'); //Esto no sobre escribe, sino que mantiene el uso de...
const { validationResult } = require("express-validator");

const crearUsuario = ( req, res = response ) => {

    const {name, email, password} = req.body;
 

    res.status(201).json({
        ok: true,
        msg:'Registrando usuario',
        name, email, password
    });

}

const loginUsuario = ( req, res = response ) => {

    const {email, password} = req.body;
   

    res.status(200).json({
        ok: true,
        msg:'login',
        email,
        password
    });
};

const revalidarToken = ( req, res = response ) => {
    res.json({
        ok: true,
        msg:'renew token'
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}