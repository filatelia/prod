const { Schema, model } = require('mongoose');

const TImagenSchema = Schema({ 
    name : {
        type: String,
        require: true,
        unique: true
    },
}, { collection: 'bdfc_tipo_imagen' });

TImagenSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Tipo_imagen', TImagenSchema);