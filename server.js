const express = require("express");
const path = require("path");
const cors = require('cors');
const corsOptions = require('./src/config/corsOptions');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./src/middleware/verifyJWT');
//const credentials = require('./src/middleware/credentials');

const publicRoutes = require("./src/routes/publicRoutes");
const privateRoutes = require("./src/routes/privateRoutes");

const PORT = process.env.PORT || 5000;
const app = express();

//app.use(credentials);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.use(publicRoutes);

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(verifyJWT);
app.use(privateRoutes);


app.listen(PORT, () => {
  console.log(`Está rodando na porta ${PORT}`);
});
