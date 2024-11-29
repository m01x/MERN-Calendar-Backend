const { response } = require('express'); //Esto no sobre escribe, sino que mantiene el uso de...
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const Usuario = require('../models/Usuario');

const crearUsuario = async( req, res = response ) => {

    const {name, email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({ email});

        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        
        usuario = new Usuario(req.body);

        //Encriptar contraseña (ver documentacion del bcrypt)
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
    

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });
        
    } catch (error) {
        console.log(error); //Error para el log del servidor, no queremos dar detalle al usuario.
        res.status(500).json({
            ok:false,
            msg: 'Por favor, comuniquese con su Sys Admin.'
        });
        
    }

    

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