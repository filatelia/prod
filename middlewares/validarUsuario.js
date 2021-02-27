const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario/usuario');

const validarExistenciaUsuario = async (req, res, next) => {

    const { email } = req.body;
    try {
        const existeusuario = await Usuario.findOne({ email });
        if (existeusuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }
        else {
            next();
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


module.exports = {
    validarExistenciaUsuario
}
