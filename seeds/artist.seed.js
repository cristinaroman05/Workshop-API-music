const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Artist } = require ("../models/Artist.js")
const { faker } = require("@faker-js/faker")

const artistList = []
// Creamos artistas 
for (let i = 0; i < 50; i++) {
    const firstName = faker.person.firstName();
    const newArtist = {
      firstName: firstName,
      genre: faker.music.genre(),
      country: faker.person.country
    };
    artistList.push(newArtist);
  }

  const run = async () => {
    try {
      await connect();
      console.log("Tenemos conexión");
  
      // Borrar datos
      await Artist.collection.drop();
      console.log("artistas eliminados");
  
      // Añadimos artistas
      const documents = artistList.map((artist) => new Artist(artist));
      await Artist.insertMany(documents);
      console.log("artistas creados correctamente!");
    } catch (error) {
      console.error("ERROR AL CONECTAR CON LA BBDD");
      console.error(error);
    } finally {
      mongoose.disconnect();
    }
  };
  
  run();