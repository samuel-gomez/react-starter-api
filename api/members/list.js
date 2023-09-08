import axios from "axios";
import { setResponseValid, setResponseInvalid } from "../utils/index.js";
import { baseRoute } from "./constants.js";
import { MESSAGES, TIMEOUT, options } from "../constants.js";
// import data from './data.js';

const Members = async (req, res) => {
  const { headers, query } = req;
  const { max, skip, sort, dir } = query;

  setTimeout(async () => {
    if (headers.testmock === "400") {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else if (headers.testmock === "500") {
      res
        .status(500)
        .send(setResponseInvalid({ label: MESSAGES.SERVOR_ERROR }));
    } else if (headers.testmock === "404") {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, label: MESSAGES.NOT_FOUND }));
    } else if (headers.testmock === "403") {
      res.status(403).send(
        setResponseInvalid({
          code: 403,
          label: MESSAGES.SERVOR_UNAUTHORIZED,
        })
      );
    } else if (headers.testmock === "0") {
      res.send(
        setResponseValid({
          data: {
            data: [],
            totals: {
              total: 0,
              currentPage: 1,
              numberPages: 1,
            },
          },
        })
      );
    } else {
      const { data } = await axios(
        `${baseRoute}?totals=true&q={}&max=${max}&skip=${skip}&sort=${sort}&dir=${dir}`,
        options
      );
      res.send(
        setResponseValid({
          data: {
            totals: {
              total: 1,
              count: 1,
              skip: 0,
              max: 1,
            },
            data,
          },
        })
      );
    }
  }, TIMEOUT);
};

export default Members;
