/* IN THIS FILE WE BUILD THE LOGIC THAT WE NEED TO MANAGE  */
const Place = require("../models/Place");

/* middleware que busca un registro por id */
const find = (res, req, next) => {
  Place.findById(req.params.id)
    .then((place) => {
      req.place = place;
      next();
    })
    .catch((err) => {
      next(err);
    });
};

const index = (req, res) => {
  /* Paginacion con mongoose
  Reicbe varios parametros, "page" que es el numero de pagina en la que se encuentra, el limite 
  y el orden ascentende o desc...
  */
  Place.paginate({}, { page: req.query.page || 1, limit: 1, sort: { _id: -1 } })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
    });
};

const create = (req, res) => {
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

const show = (req, res) => {
  res.json(req.place);
};

const update = (req, res) => {
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
  /* Estariamos iterando y validando cada uno de los elementos */
  attributes.forEach((attr) => {
    /* este metodo de JS verifica si el elemento del objeto es existente */
    if (Object.prototype.hasOwnProperty.call(req.body, attr)) {
      placeParams[attr] = req.body[attr];
    }
  });

  /* copia los datos de la fuente "placeParams" a req.place, osea que req.place es una copia de placeParams */
  req.place = Object.assign(req.place, placeParams);
  req.place
    .save()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
};

const destroy = (req, res) => {
  req.place
    .remove()
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
  find,
};
