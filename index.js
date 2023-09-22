import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

/* for dirname ES module */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* for dirname ES module */

const { PORT = "80", ORIGIN } = process.env;

import { API } from "./api/constants.js";
import {
  members,
  membersDetail,
  membersAdd,
  membersSearch,
  downloadDetails,
} from "./api/members/index.js";
import { people, addPeople } from "./api/people/index.js";
import { convert } from "./api/currency/index.js";
import { submitForm } from "./api/app/index.js";

const app = express();
const router = express.Router();

// app.use(cors());

var whitelist = [
  "http://localhost:3000",
  "https://react-starter-vitejs.netlify.app/",
];
/* app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
); */
app.use(
  cors({
    credentials: true,
    origin: "https://react-starter-vitejs.netlify.app",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Headers", "x-sso");
  // res.header("Access-Control-Expose-Headers", "x-sso");

  next();
});

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static("public"));

router.get(`/members`, members);
router.get(`/members/search`, membersSearch);
router.get(`/members/:id`, membersDetail);
router.post(`/members/add`, membersAdd);
router.get(`/members/:id/download-detail`, downloadDetails);
router.get(`/people`, people);
router.post(`/people/add`, addPeople);
router.get(`/convert/:base_currency`, convert);
router.post(`/form`, submitForm);

app.use(`/${API}`, router);

/* exemple render page */
app.get("/", (req, res) => {
  res.render("pages/index", { title: "Accueil" });
});

/* exemple render page about */
app.get("/about", (req, res) => {
  res.render("pages/about", { title: "About" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
