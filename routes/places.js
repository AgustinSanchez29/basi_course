/* IN THIS FILE WE CODE THE ROUTES  */

const express = require("express");
const placesontroller = require("../controllers/PlacesControllers");
let router = express.Router();

/* NOTE: ins't necessary send req and res variables*/
router.route("/").get(placesontroller.index).post(placesontroller.create);
/* -------------------------------------------------------------------- */
router
  .route("/:id")
  .get(placesontroller.find, placesontroller.show)
  .put(placesontroller.find, placesontroller.update)
  .delete(placesontroller.find, placesontroller.destroy);

module.exports = router;
