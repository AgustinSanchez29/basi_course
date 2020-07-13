/* Estructuracion de la base de datos
NOTAS: los esquemas en mongo son como las tablas */

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

let placeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  acceptsCreditCard: {
    type: Boolean,
    default: false,
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number,
});

/* se agrega como plugin la libreria */
placeSchema.plugin(mongoosePaginate);
let Place = mongoose.model("Place", placeSchema);
module.exports = Place;
//EXPORTAMO EL OBJETO PARA PODER ACCEDER A LOS DATOS DESDE OTRO ARCHIVO
