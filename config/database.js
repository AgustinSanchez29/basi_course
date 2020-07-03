/* archivo de configuracion de la base de datos
devuelve un objeto con las propiedades de conexion

 */
const mongoose = require("mongoose");

//nombre de la base de datos, si no exite se crea
const dbName = "places_api";

module.exports = {
  connect: async () =>
    await mongoose
      .connect("mongodb://localhost/" + dbName)
      .then(() => {
        console.log("exito");
      })
      .catch(() => console.log("error to connect")),
  dbName,
  connection: () => {
    /* si esta conectado retorna la conexion, sino ejecuta el metodo connect pata conectarse */
    if (mongoose.connection) return mongoose.connection;
    return this.connect();
  },
};
