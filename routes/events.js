
//Tarea!
//Todas tienen que pasar por la validacion del JWT.

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post('/', crearEvento);

//Actualizar Evento
router.put('/:id', actualizarEvento);

router.delete('/id', eliminarEvento);

/**
 * todo: Agregar middlewares y validaciones, y en el controller\events ,
 *      implementar los controladores de cada ruta
 */




