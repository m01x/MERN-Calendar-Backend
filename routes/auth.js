/**
 * 
 * Rutas de usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post( 
    '/new' , 
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos //Middleware custom!
    ]
    , 
    crearUsuario );

router.post(
     '/' ,
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos //Middleware custom!
    ], 
    loginUsuario);

router.get( '/renew' , revalidarToken );

module.exports = router;