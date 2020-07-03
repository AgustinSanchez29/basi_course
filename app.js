var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
/* ----------------------------------------- */
const bodyParser = require("body-parser");
const db = require("./config/database");
const Place = require("./models/Place");

db.connect();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
/* app.use(express.json());
app.use(express.urlencoded({ extended: false })); */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* endpoint para crear un nuevo lugar */
app.post("/places", (req, res) => {
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
});

app.get("/places", (req, res) => {
  Place.find({})
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/places/:id", (req, res) => {
  Place.findById(req.params.id)
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

/* END POINT PARA ACTUALIZAR UN ELEMENTO */
app.put("/places/:id", (req, res) => {
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
});

/* endpoint para eliminar */
app.delete("/places/:id", (req, res) => {
  Place.findByIdAndRemove(req.params.id)
    .then((docs) => {
      res.status(200).json({});
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

module.exports = app;
