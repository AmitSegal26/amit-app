import Joi from "joi";
import validation from "./validation";

const profileParamSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

const validateProfileParamSchema = (userInput) =>
  validation(profileParamSchema, userInput);

export default validateProfileParamSchema;
