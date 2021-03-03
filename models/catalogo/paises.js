const { Schema, model } = require('mongoose');
const PaisSchema = Schema({
     name: {
        type : String,
        required: true,
        unique: true
     },
     para_buscar : {
      type : String,
      required : false
   },
     moneda_nombre : {
        type : String,
        required : false
     },
     
     moneda_code : {
        type : String,
        required : false
     },
     abreviatura_uno : {
        type : String,
        required : true
     },
     abreviatura_dos : {
      type : String,
      required : false
   },
     img : {
      type : String,
      required : true
     }
},{  collection: 'bdfc_pais' })


PaisSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Pais', PaisSchema);