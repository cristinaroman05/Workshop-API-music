const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { User } = require ("../models/User.js")
const { faker } = require("@faker-js/faker")

const userList = []
// Creamos usuarios adicionales
for (let i = 0; i < 50; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email({ firstName, lastName, })
    };
    userList.push(newUser);
  }

  const run = async () => {
    try {
      await connect();
      console.log("Tenemos conexión");
  
      // Borrar datos
      await User.collection.drop();
      console.log("Usuarios eliminados");
  
      // Añadimos usuarios
      const documents = userList.map((user) => new User(user));
      await User.insertMany(documents);
      console.log("Usuarios creados correctamente!");
    } catch (error) {
      console.error("ERROR AL CONECTAR CON LA BBDD");
      console.error(error);
    } finally {
      mongoose.disconnect();
    }
  };
  
  run();