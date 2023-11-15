import axios from "axios";
import { setResponseValid, setResponseInvalid } from "../utils/index.js";
import { baseRoute } from "./constants.js";
import { MESSAGES, TIMEOUT, options } from "../constants.js";
// import data from './data.js';

const MembersSearch = async (req, res) => {
  const { query } = req;
  const { name = "404" } = query;

  setTimeout(async () => {
    if (name === "400") {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else if (name === "500") {
      res
        .status(500)
        .send(setResponseInvalid({ label: "MESSAGES.SERVOR_ERROR" }));
    } else if (name === "404") {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, label: MESSAGES.NOT_FOUND }));
    } else if (name === "403") {
      res
        .status(403)
        .send(
          setResponseInvalid({ code: 403, label: MESSAGES.SERVOR_UNAUTHORIZED })
        );
    } else if (name === "empty") {
      res.send(setResponseValid({ data: [] }));
    } else {
      const { data } = await axios(
        `${baseRoute}?q={ "$or": [ { "firstname": {"$regex" :"${name}"} }, { "lastname": {"$regex" :"${name}"} } ] }`,
        options
      );
      res.send(
        setResponseValid({
          data: [
            ...data,
            {
              _id: "error500",
              firstname: "error500",
              lastname: "error500",
              created: "2020-01-27T00:00:00.000Z",
              birthdate: "1990-02-14T00:00:00.000Z",
              status: true,
              email: "error500@behance.net",
              sexe: "M",
            },
          ],
        })
      );
    }
  }, TIMEOUT);
};

export default MembersSearch;
