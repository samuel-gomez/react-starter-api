import { setResponseValid, setResponseInvalid } from "../utils/index.js";
import { MESSAGES, TIMEOUT } from "../constants.js";

const MembersAdd = async (req, res) => {
  const { firstname } = req.body;

  setTimeout(async () => {
    if (firstname === "400") {
      res
        .status(400)
        .send(setResponseInvalid({ code: 400, label: MESSAGES.BAD_REQUEST }));
    } else if (firstname === "500") {
      res
        .status(500)
        .send(setResponseInvalid({ label: MESSAGES.SERVOR_ERROR }));
    } else if (firstname === "404") {
      res
        .status(404)
        .send(setResponseInvalid({ code: 404, label: MESSAGES.NOT_FOUND }));
    } else {
      res.send(
        setResponseValid({
          data: req.body,
        })
      );
    }
  }, TIMEOUT);
};

export default MembersAdd;
