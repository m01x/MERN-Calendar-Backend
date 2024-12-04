
//Tarea!
//Todas tienen que pasar por la validacion del JWT.

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { validarJWT } = require("../middlewares/validar-jwt");

// Obtener eventos
router.get( '/', validarJWT ,getEventos );

// Crear un nuevo evento
router.post( '/', validarJWT ,crearEvento );

//Actualizar Evento
router.put( '/:id', [ check('id').not().isEmpty(), validarJWT ], actualizarEvento );

router.delete( '/:id' , [ check('id').not().isEmpty(), validarJWT ] , eliminarEvento );

/**
 * todo: Agregar middlewares y validaciones, y en el controller\events ,
 *      implementar los controladores de cada ruta
 */

module.exports = router;


