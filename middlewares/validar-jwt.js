const jwt = require('jsonwebtoken');



const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-access-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid, roleuser } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        req.roleuser = roleuser;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
 
}


module.exports = {
    validarJWT
}