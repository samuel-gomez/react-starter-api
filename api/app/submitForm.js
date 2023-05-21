import { TIMEOUT } from '../constants.js';

const submitForm = async (req, res) => {
  const { body } = req;
  let hasError = false;
  if (!body.food || !body.drink) {
    hasError = true;
  }
  setTimeout(async () => {
    if (hasError) {
      res
        .status(400)
        .send({ message: 'les champs food et drink sont obligatoires' });
    } else {
      res.send({ data: req.body });
    }
  }, TIMEOUT);
};

export default submitForm;
