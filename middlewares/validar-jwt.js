const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = ( req, res = response, next ) => {
  //Esto lo vamos a leer desde x-token, en los headers de la peticion http
  const token = req.header('x-token');

  if( !token ){
    return res.status(401).json({
        ok:false,
        msg:'no hay token en la validacion'
    });
  }

  try{
    //Validar token
    const { uid, name} = jwt.verify( token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  }catch(error){
    return res.status(401).json({
        ok:false,
        msg:'Token no valido'
    })
  }

  next();

}

module.exports = {
    validarJWT
}