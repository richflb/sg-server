const express = require("express");
const routes = require("./routes");
const path = require("path");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(routes);

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`Está rodando na porta ${PORT}`);
});
