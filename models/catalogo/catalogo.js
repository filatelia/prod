const { Schema, model } = require('mongoose');
const ProductoSchema = Schema({

      name: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tipo: [{
        type: Schema.Types.ObjectId,
        ref: 'tipo_cat',
        autopopulate: true,
        required: true
    }],
    pais: [{
        type: Schema.Types.ObjectId,
        ref: 'pais',
        autopopulate: true,
        required: true
    }],
    tema: [{
        type: Schema.Types.ObjectId,
        ref: 'temas',
        autopopulate: true,
        required: true
    }],
    anio: {
        type: Number,
        required: true
    },
    grupo: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    num_estampillas: {
        type: Number,
        required: true
    },
    descripcion_serie: {
        type: String,
        required: true
    },
    valor_facial: {
        type: String,
        required: true
    },
    num_catalogo: {
        type: String,
        required: true
    },
    valor_catalogo: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },

    estado: {
        type: Boolean,
        default: true
    }
}, { collection: 'bdfc_pais' })

schema.plugin(require('mongoose-autopopulate'));

PaisSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Pais', PaisSchema);