const { 
    createTour,
    deleteTour,
    updateTour,
    getAllTours,
    getToursByProfileID } = require("../controllers/manage-tours/toursController")


 function  manageTourRoute(app) {
    app.route("/posts/:id?")
    .get(getToursByProfileID)
    .post(createTour)
    .put(updateTour)
    .delete(deleteTour)
}

module.exports = {manageTourRoute};