import { setResponseValid, setResponseInvalid } from "../utils/index.js";
import { MESSAGES, TIMEOUT } from "../constants.js";
import data from "./data.js";

const Meteo = async (req, res) => {
  const { params } = req;
  const { capitalName } = params;

  const capital = data[capitalName.toLocaleLowerCase()];

  setTimeout(async () => {
    if (capitalName === "400") {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else if (capitalName === "500") {
      res
        .status(500)
        .send(setResponseInvalid({ label: MESSAGES.SERVOR_ERROR }));
    } else if (capitalName === "403") {
      res.status(403).send(
        setResponseInvalid({
          code: 403,
          detail: MESSAGES.SERVOR_UNAUTHORIZED,
        })
      );
    } else if (!capital) {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, label: MESSAGES.NOT_FOUND }));
    } else {
      res.send(setResponseValid({ data: capital }));
    }
  }, TIMEOUT);
};

export default Meteo;
