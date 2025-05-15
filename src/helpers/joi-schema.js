import joi from "joi";

export const email = joi
  .string()
  .pattern(RegExp('gmail.com$')).required();

export const password = joi.string().min(6).required();
