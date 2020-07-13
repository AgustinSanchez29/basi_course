/* IN THIS FILE WE BUILD THE LOGIC THAT WE NEED TO MANAGE  */
const Place = require("../models/Place");

const index = () => {
  Place.find({})
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
    });
};

const create = () => {
  Place.create({
    title: req.body.title,
    description: req.body.description,
    acceptsCreditCard: req.body.acceptsCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour,
  })
    .then((doc) => {
      res.json(doc); /* doc es el objeto que contiene los datos recibidos */
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

const show = () => {
  Place.findById(req.params.id)
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
};

const update = () => {
  /* array con las variables que tienen el formato del restaurante */
  let attributes = [
    "title",
    "description",
    "acceptsCreditCard",
    "openHour",
    "closeHour",
  ];
  /* json object que lleva las variables con sus nuevos atributos */
  let placeParams = {};
  /* Estariamos iterando y validando cada uno de los de los elementos */
  attributes.forEach((attr) => {
    /* este metodo de JS verifica si el elemento del objeto es existente */
    if (Object.prototype.hasOwnProperty.call(req.body, attr)) {
      placeParams[attr] = req.body[attr];
    }
  });
  /* le pasamos el id y el objeto a actualizar */
  Place.findByIdAndUpdate(req.params.id, placeParams)
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
};

const destroy = () => {
  Place.findByIdAndRemove(req.params.id)
    .then((docs) => {
      res.status(200).json({});
    })
    .catch((err) => {
      res.status(403).json(err);
    });
};

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
};
