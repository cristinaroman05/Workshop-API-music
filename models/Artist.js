const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creamos el schema del usuario
const artistSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
},
{
    timestamps: true
}
);
const Artist = mongoose.model("Artist", artistSchema);
module.exports = { Artist }