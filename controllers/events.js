
const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async(req, res = response) => {
    try {
        res.status(201).json({
            ok: true,
            msg:'Consulta realizada getEventos'
        });
    } catch (error) {
        console.log(error); //Error para el log del servidor, no queremos dar detalle al usuario.
        res.status(500).json({
            ok:false,
            msg: 'Por favor, comuniquese con su Sys Admin.'
        });
    }
  
}

const crearEvento = async( req, res = response) => {

    const evento = new Evento(req.body);
    console.log(req.uid);
    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.status(201).json({
            ok: true,
            evento:eventoGuardado
        });
    } catch (error) {
        console.log(error); //Error para el log del servidor, no queremos dar detalle al usuario.
        res.status(500).json({
            ok:false,
            msg: '[CrearEvento Controller]: Por favor, comuniquese con su Sys Admin.'
        });
    }
  
}

const actualizarEvento = async(req, res = response) => {
    try {
        res.status(201).json({
            ok: true,
            msg:'Consulta realizada actualizarEvento'
        });
    } catch (error) {
        console.log(error); //Error para el log del servidor, no queremos dar detalle al usuario.
        res.status(500).json({
            ok:false,
            msg: 'Por favor, comuniquese con su Sys Admin.'
        });
    }
  
}

const eliminarEvento = async(req, res = response) => {
    try {
        res.status(201).json({
            ok: true,
            msg:'Consulta realizada eliminarEvento'
        });
    } catch (error) {
        console.log(error); //Error para el log del servidor, no queremos dar detalle al usuario.
        res.status(500).json({
            ok:false,
            msg: 'Por favor, comuniquese con su Sys Admin.'
        });
    }
  
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}