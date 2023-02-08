const express = require("express");
const path = require("path");
const cors = require('cors');
//const corsOptions = require('./src/config/corsOptions');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./src/middleware/verifyJWT');
//const credentials = require('./src/middleware/credentials');

const publicRoutes = require("./src/routes/publicRoutes");
const privateRoutes = require("./src/routes/privateRoutes");
const account = require("./src/routes/account");
const profile = require("./src/routes/profile");
const upload = require("./src/routes/upload");
const contactsRoutes = require("./src/routes/contactsRoutes");
const helpTextRoutes = require("./src/controllers/helpTextController");
const { searchTours, searchGuides } = require("./src/routes/searchRoutes");
const publicContacts = require("./src/routes/publicContactRoutes");
const PORT = process.env.PORT || 3500;
const app = express();

app.use(credentials);

app.use(cors(corsOptions));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "public")));
console.log(path.resolve(__dirname, "public"))

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(publicRoutes);
helpTextRoutes(app);
searchGuides(app);
searchTours(app);
publicContacts(app);

app.use(verifyJWT);
app.use(privateRoutes);
app.use(account);
app.use(profile);
app.use(upload);
contactsRoutes(app)


app.listen(PORT, () => {
  console.log(`Está rodando na porta ${PORT}`);
});
