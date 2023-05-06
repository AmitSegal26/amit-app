import Joi from "joi";
import validation from "./validation";

const profileParamSchema = Joi.object({
  id: Joi.string().min(1).max(25).required(),
});

const validateProfileParamSchema = (userInput) =>
  validation(profileParamSchema, userInput);

export default validateProfileParamSchema;
