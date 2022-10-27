import axios from 'axios';
import { setResponseValid, setResponseInvalid } from '../utils/index.js';
import { baseRoute } from './constants.js';
import { MESSAGES, TIMEOUT, options } from '../constants.js';

const Convert = async (req, res) => {
  const { base_currency } = req.params;

  setTimeout(async () => {
    if (base_currency === '400') {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else if (base_currency === '500') {
      res
        .status(500)
        .send(setResponseInvalid({ label: MESSAGES.SERVOR_ERROR }));
    } else if (base_currency === '404') {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, label: MESSAGES.NOT_FOUND }));
    } else {
      const { data } = await axios(
        `${baseRoute}&base_currency=${base_currency}`,
        options,
      );
      res.send(setResponseValid({ data }));
    }
  }, TIMEOUT);
};

export default Convert;
