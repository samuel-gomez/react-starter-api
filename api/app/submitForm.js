import { TIMEOUT } from '../constants.js';

const submitForm = async (req, res) => {
  setTimeout(async () => {
    res.send({ data: req.body });
  }, TIMEOUT);
};

export default submitForm;
