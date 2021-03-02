const { response } = require('express');
const Pais = require('../../models/catalogo/paises');
const fs = require("fs");
const Path = require("path");

const getPaisByName = async(req, res=response) => {
    const names = req.params.name;

 
function capitalizarPrimeraLetra(name) {
    var namez = name.toLowerCase();
  return namez.charAt(0).toUpperCase() + namez.slice(1);
}

const name = capitalizarPrimeraLetra(names); 
    console.log("name: : ",name);
    const paisEncontrado = await Pais.findOne({name});
    console.log("pais encontrado", paisEncontrado);
    if(!paisEncontrado){
        return res.json("No se ha encontrado el pais, recuerde no usar caracteres especiales");
         
     }

    const pahtImagen = Path.join(__dirname, '../..'+ paisEncontrado.img);
    
    console.log(pahtImagen);

      return  res.sendFile(pahtImagen);
    }

const createPais = async(req, res = response) => {

    const { name } = req.body;
    try {
        const existepais = await Pais.findOne({ name });
        if ( existepais ) {
            return res.status(400).json({
                ok: false,
                msg: 'El pais ya existe'
            });
        }
        const pais_ = new Pais( req.body );
        // Guardar usuario
        await pais_.save();
        res.json({
            ok: true,
            pais_
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deletePais = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const pais_ = await Pais.findById( uid );
        if ( !pais_ ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un pais por ese id'
            });
        }


        const paisActualizado = await Pais.findByIdAndUpdate( uid, { estado : false }, { new: true } );

        //await Pais.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: "pais eliminado",
            pais: paisActualizado
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const updatePais = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const pais_ = await Pais.findById( uid );

        if ( !pais_ ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un pais por ese id'
            });
        }
        // Actualizaciones
        const { name, ...campos } = req.body;

        if ( pais_.name !== name ) {

            const existepais = await Pais.findOne({ name });
            if ( existepais ) {
                return res.status(400).json({
                    ok: false,
                    msg: "ya existe un Pais con ese nombre"
                });
            }
        }

        const paisActualizado = await Pais.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            pais : paisActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


module.exports = {
    getPaisByName,
    createPais,
    deletePais,
    updatePais
}