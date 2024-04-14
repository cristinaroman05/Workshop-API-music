const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Song } = require ("../models/Song.js")
const { faker } = require("@faker-js/faker")

const songList = [
    { title:"Rolling in the deep" , duration: 3.05, creationYear: 2015}
]
// Creamos canciones 
for (let i = 0; i < 50; i++) {
    const newSong = {
      title: faker.music.songName(),
      duration: faker.datatype.number({min: 2.30, max: 4.00}),
      creationYear: faker.datatype.number({ min: 1900, max: 2024})
    };
    songList.push(newSong);
  }

  const run = async () => {
    try {
      await connect();
      console.log("Tenemos conexión");
  
      // Borrar datos
      await Song.collection.drop();
      console.log("Canciones eliminadas");
  
      // Añadimos Canciones
      const documents = songList.map((song) => new Song(song));
      await Song.insertMany(documents);
      console.log("Canciones creadas correctamente!");
    } catch (error) {
      console.error("ERROR AL CONECTAR CON LA BBDD");
      console.error(error);
    } finally {
      mongoose.disconnect();
    }
  };
  
  run();