const { connect } = require("./db.js");
const express = require("express");
const { userRouter } = require("./routes/user.routes.js")
const { artistRouter } = require("./routes/artist.routes.js")
const { songRouter } = require("./routes/song.routes.js")

const main = async () => {
  const database = await connect();

  // Configuración del server
  const PORT = 3000;
  const server = express();
  const router = express.Router();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use("/user", userRouter);
  server.use("/artist", artistRouter);
  server.use("/song", songRouter);


  server.use("/", router);

  server.listen(PORT, () => {
    console.log(`Server levantado en el puerto ${PORT}`);
  });
};
main();
