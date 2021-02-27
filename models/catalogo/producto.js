const { Schema, model } = require('mongoose');
const ProductoSchema = Schema({
     name: {
        type : String,
        required: true,
        unique: true
     },
     desscripcion : {
        type : String,
        required : true
     },
      tema: [{
        type : Schema.Types.ObjectId,
        ref: 'temas',
        autopopulate: true,
        required : true
     }],

     img : {
      type : String,
      required : true
     },
     estado : {
         type : Boolean,
         default : true
     }
},{  collection: 'bdfc_pais' })

schema.plugin(require('mongoose-autopopulate'));

PaisSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Pais', PaisSchema);