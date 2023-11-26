import { formSchema } from '@whatsapp.clone/common';

const validateForm = (req, res, next) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        console.log('form is good');
        next();
      }
    });
};

export default validateForm;
