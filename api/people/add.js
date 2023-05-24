import { setResponseValid, setResponseInvalid } from "../utils/index.js";
import { MESSAGES, TIMEOUT } from "../constants.js";

const AddPeople = async (req, res) => {
  const { body } = req;
  let hasError = false;

  if (!body.firsname || !body.lastname || !body.email || !body.manager) {
    hasError = true;
  }
  setTimeout(async () => {
    if (hasError) {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else {
      res.send(setResponseValid({ data: body }));
    }
  }, TIMEOUT);
};

export default AddPeople;
