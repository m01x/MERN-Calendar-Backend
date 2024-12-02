const mongoose = require('mongoose');
const { response } = require('express'); //Esto no sobre escribe, sino que mantiene el uso de...
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

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

        //Generar JWT
    
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error); //Error para el log del servidor, no queremos dar detalle al usuario.
        res.status(500).json({
            ok:false,
            msg: 'Por favor, comuniquese con su Sys Admin.'
        });
        
    }

    

}

const loginUsuario = async( req, res = response ) => {

    const {email, password} = req.body;
    try {
        

        //Ver si existe el usuario
        const emailLimpio = email.trim().toLowerCase();
        const usuario = await Usuario.findOne({ email: emailLimpio });

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }
        
        //Confirmas los password
        const validPassword = bcrypt.compareSync( password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            })
        }   
        
        //* Conceder acceso, generar nuestro json web token
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error); //Error para el log del servidor, no queremos dar detalle al usuario.
        res.status(500).json({
            ok:false,
            msg: 'Por favor, comuniquese con su Sys Admin.'
        });
        
    }
};

const revalidarToken = async( req, res = response ) => {
    //revalida el token por otras 2 horas mas. Me servira para saber si el token es valido y mantener al usuario logeado
    
    const uid = req.uid;
    const name = req.name;

    //Generar un nuevo jwt y retornarlo en esta petición.
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}