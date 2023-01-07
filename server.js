const express = require("express");
const routes = require("./routes");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Está rodando na porta ${PORT}`);
});
