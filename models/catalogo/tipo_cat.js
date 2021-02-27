const { Schema, model } = require('mongoose');

const Tipo_CatSchema = Schema({ 
    name : {
        type: String,
        require: true,
        unique: true
    }
}, { collection: 'bdfc_tipo_cat' });

TemasSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('tipo_cat', TemasSchema);