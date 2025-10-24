const express = require("express");
const dotenv = require("dotenv");
const db = require("../backend/config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize");

const UserRoute = require("./routes/UserRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");
const KriteriaDefisitRoute = require("./routes/KriteriaDefisitRoute.js");
const KriteriaSurplusRoute = require("./routes/KriteriaSurplusRoute.js");
const DatasetDefisitRoute = require("./routes/DatasetDefisitRoute.js");
const DatasetSurplusRoute = require("./routes/DatasetSurplusRoute.js");
const HasilAkhirPasienRoute = require("./routes/HasilAkhirPasienRoute.js");
const KriteriaMakananRoute = require("./routes/KriteriaMakananRoute.js");
const DatasetMakananRoute = require("./routes/DatasetMakananRoute.js");
const HasilAkhirMakananRoute = require("./routes/HasilAkhirMakananRoute.js");

dotenv.config();
const app = express();
const port = process.env.APP_PORT

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db
})

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cookieParser());
app.use(express.json());

app.use(UserRoute);
app.use(AuthRoute);
app.use(KriteriaDefisitRoute);
app.use(KriteriaSurplusRoute);
app.use(DatasetDefisitRoute);
app.use(DatasetSurplusRoute);
app.use(HasilAkhirPasienRoute);
app.use(KriteriaMakananRoute);
app.use(DatasetMakananRoute);
app.use(HasilAkhirMakananRoute);

app.listen(port, ()=> console.log("Server Sedang berjalan di http://localhost:5000"));