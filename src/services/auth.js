import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
        },
      });

      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register is successfully" : "Email is used",
        token,
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Login is successfully" : "Error",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
