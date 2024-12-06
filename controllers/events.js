
const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async(req, res = response) => {
    try {

        const eventos = await Evento.find().populate('user', 'name'); //sin condiciones, queremos traerlos todos.


        res.status(201).json({
            ok: true,
            eventos
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
    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() != uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

    
        /**
         * * Si llegamos hasta aqui, el usuario es el mismo que hizo ese evento y si hay evento por ese ID:
         * Ojo con const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento )
         * Esto retorna en la constante "eventoActualizado" el valor antes de actualizar, por si hay que
         * realizar algun tipo de comparacion. 
         * Ejemplo
         * 
         ** Suponiendo que el telefono antiguo en BD era el: "+569 111 111"
         ** const telefonoId = 12;
         ** const nuevoTelefono = "+569 222 222"
         * 
         ** const telefonoActualizado = await Telefono.findByIdAndUpdate( telefonoId, nuevoTelefono ) // "+569 111 111"
         * 
         ** pero, si parametrizamos la consulta, para que retorne altiro el telefono actualizado, basta con poner:
         * 
         ** const telefonoActualizado = await Telefono.findByIdAndUpdate( telefonoId, nuevoTelefono, { new:true } ) // "+569 222 222"
         */

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new:true} );

        res.status(201).json({
            ok: true,
            msg:'Evento actualizado!',
            evento: eventoActualizado
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

    
        const eventoId = req.params.id;
        const uid = req.uid;
        try {
    
            const evento = await Evento.findById( eventoId );
    
            if( !evento ) {
                res.status(404).json({
                    ok: false,
                    msg: 'Evento no existe por ese id'
                });
            }
    
            if ( evento.user.toString() != uid ){
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegio de editar este evento'
                });
            }
    
    
            const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
    
            res.status(201).json({
                ok: true,
                msg:'Evento Eliminado'
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