import Joi from "joi";
import validation from "./validation";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  middleName: Joi.string().min(2).max(100).allow(""),
  lastName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().min(7).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(2)
    .max(10)
    .required(),
  state: Joi.string().min(2).max(40).allow(""),
  country: Joi.string().min(2).max(40).required(),
  city: Joi.string().min(2).max(40).required(),
  street: Joi.string().min(2).max(40).required(),
  houseNumber: Joi.string().min(2).max(40).required(),
  zipCode: Joi.string().min(2).max(40).allow(""),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

export default validateRegisterSchema;
