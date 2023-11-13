import { setResponseValid, setResponseInvalid } from "../utils/index.js";
import { MESSAGES, TIMEOUT } from "../constants.js";
// import people from "./data.js";
import data from "./detailData.js";

/* const getRandom = (range = 9) => Math.round(Math.random() * range);
const getContract = () => [...Array(10).keys()].map(getRandom).join("");
const getRandomDate = () =>
  `${new Date(`200${getRandom()}-${getRandom(12)}-${getRandom(31)}`)}`;
const getRandomAgencyName = (randomIndex = getRandom(3)) =>
  [
    "Agence Dupond",
    "Agence du centre",
    "Agence du Pont neuf",
    "Agence de la place",
  ][randomIndex];
const getRandomStreet = (randomIndex = getRandom(3)) =>
  ["rue de Lille", "boulevard de l'ouest", "avenue de Marcq", "rue de Paris"][
    randomIndex
  ];
const getRandomCity = (randomIndex = getRandom(3)) =>
  ["Neuville", "Toulouse", "Bordeaux", "Lyon"][randomIndex];
const getAdresse = () =>
  `${getRandom(200)} ${getRandomStreet()}, ${getRandomCity()}`;

const getRandomPhone = () =>
  `0${getRandom(
    5
  )} ${getRandom()}${getRandom()} ${getRandom()}${getRandom()} ${getRandom()}${getRandom()} ${getRandom()}${getRandom()}`;

const generateContract = (id = 0) => ({
  clientId: id,
  contractNumber: `${getContract()}`,
  date: getRandomDate(),
  agencyName: getRandomAgencyName(),
  adresse: getAdresse(),
  phone: getRandomPhone(),
}); */

// const list = people.map((item) => generateContract(item._id));

const PeopleDetail = async (req, res) => {
  const { id } = req.params;

  const detail = data.find((item) => item.clientId === id);

  setTimeout(async () => {
    if (id === "400") {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else if (id === "500") {
      res
        .status(500)
        .send(setResponseInvalid({ label: MESSAGES.SERVOR_ERROR }));
    } else if (id === "404" || !detail) {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, label: MESSAGES.NOT_FOUND }));
    } else {
      res.send(setResponseValid({ data: detail }));
    }
  }, TIMEOUT);
};

export default PeopleDetail;
