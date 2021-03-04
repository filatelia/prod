const { Schema, model } = require('mongoose');

const uploads_ImagenSchema = Schema({ 
    name : {
        type: String,
        require: true,
        unique: true
    },
    name_buscar : {
        type: String,
        require: true,
        unique: true
    },
    imagen_url : {
        type:String,
        require: true,
    }
}, { collection: 'bdfc_uploads_imagenes' });

uploads_ImagenSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('uploads_imagen', uploads_ImagenSchema);