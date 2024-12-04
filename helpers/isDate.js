
const moment = require('moment');

//Moment es un paquete que me permite validar fechas... trae utilidades importantes!

const isDate = ( value ) => {
  
    if (!value){
        return false;
    }

    const fecha = moment(value);

    if ( fecha.isValid ){
        return true;
    } else {
        return false;
    }
};

module.exports = { isDate };