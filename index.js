import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { WebSocketServer } from "ws";

/* for dirname ES module */
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* for dirname ES module */

const { PORT = "80" } = process.env;

import { API } from "./api/constants.js";
import {
  members,
  membersDetail,
  membersAdd,
  membersSearch,
  downloadDetails,
} from "./api/members/index.js";
import { people, addPeople, detailPeople } from "./api/people/index.js";
import { meteo } from "./api/meteo/index.js";
import { convert } from "./api/currency/index.js";
import { submitForm } from "./api/app/index.js";

const app = express();
const router = express.Router();

/* 
var whitelist = [
  "https://react-starter-vitejs.netlify.app",
  "https://react-starter-toolkit.netlify.app",
  "http://localhost:3000",
];

app.use(
  cors({
    credentials: true,
    origin: whitelist,
  })
);
 */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// permet de rendre disponible une valeur dans le header de la réponse
/* 
app.use((req, res, next) => {
  res.append("toto", "sam");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "toto");
  res.header("Access-Control-Expose-Headers", "toto");
  next();
}); 

côté front il faut faire :

const response = await fetchFn(url, config);
console.log(response.headers.get('toto'));

*/

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
router.get(`/people/:id`, detailPeople);

router.get(`/convert/:base_currency`, convert);
router.post(`/form`, submitForm);
router.get(`/meteo/:capitalName`, meteo);

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

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
