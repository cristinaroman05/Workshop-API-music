const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Artist } = require("../models/Artist.js");
const { Song } = require("../models/Song.js");
const { generateRandom } = require("../utils.js")

const songRelationsSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión!");

    
    const songs = await Song.find();
    const artist = await Artist.find();

    
    if (!songs.length) {
      console.error("No hay canciones para relacionar en la base de datos");
      return;
    }

    if (!artist.length) {
      console.error("No hay artistas para relacionar en la base de datos");
      return;
    }


    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      const randomArtist = artist[generateRandom(0, artist.length - 1)];
      song.artist = randomArtist.id;
      await song.save();
    }

    console.log("Relaciones entre canciones-artistas creadas correctamente.");
  } catch (error) {
  } finally {
    mongoose.disconnect();
  }
};

songRelationsSeed();