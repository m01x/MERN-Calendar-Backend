
//mas facil el backend y el pibe InitialD dice q es peluo jsjsjssj (por lo menos node)
//Cuando me salgan cocos mas grandes, ire por laravel :B

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { validarJWT } = require("../middlewares/validar-jwt");

// Obtener eventos
router.get( '/', validarJWT ,getEventos );

// Crear un nuevo evento
router.post( '/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de término es obligatoria').custom(isDate),
    validarCampos,
    validarJWT
] ,crearEvento );

//Actualizar Evento
router.put( '/:id', [ check('id').not().isEmpty(), validarJWT ], actualizarEvento );

router.delete( '/:id' , [ check('id').not().isEmpty(), validarJWT ] , eliminarEvento );

module.exports = router;


