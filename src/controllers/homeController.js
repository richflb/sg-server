const SEUGUIA_URL = process.env.SEUGUIA_URL; 

exports.home = (request, response) => {
  response.status(200).render("homeLandpage", {SEUGUIA_URL});
};
