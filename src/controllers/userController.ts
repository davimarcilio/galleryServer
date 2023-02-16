import bcrypt from "bcrypt";
import { prisma } from "../database/connection";
import { z } from "zod";
import { registerSchema } from "../validator/user/registerUserValidator";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { patchSchema } from "../validator/user/patchUserValidator";
export const userController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const saltRounds = bcrypt.genSaltSync(10);

      const { login, name, password } = registerSchema.parse(req.body);

      const saltPassword = bcrypt.hashSync(password, saltRounds);

      const userLogin = await prisma.user.findUnique({
        where: {
          login,
        },
      });

      if (!!userLogin) {
        return res.status(302).json({
          message: "Login already used",
          path: "Login",
          code: "Login Found",
        });
      }

      const userResponse = await prisma.user.create({
        data: {
          login,
          name,
          password: saltPassword,
        },
      });

      return res.status(200).json({
        userResponse,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const treatedZodErrors = error.issues.map((issue) => {
          return {
            message: issue.message,
            path: issue.path,
            code: issue.code,
          };
        });
        return res.status(400).json({ error: treatedZodErrors });
      }
      return res.status(400).json({ error });
    }
  },
  loginUser: async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          login: req.body.login,
        },
      });
      if (!!!user) {
        return res.status(404).json({
          message: "User not found",
          path: "Login",
          code: "Login not found",
        });
      }
      if (bcrypt.compareSync(req.body.password, user.password) === false) {
        return res.status(404).json({
          message: "Incorrect password",
          path: "Login",
          code: "Incorrect password",
        });
      }
      console.log(process.env.SECRET_JWT);

      const jwtEncoded = jwt.sign(
        {
          id: user.id,
          name: user.name,
          login: user.login,
        },
        process.env.SECRET_JWT!,
        { expiresIn: "7d" }
      );
      return res.status(200).json({
        id: user.id,
        name: user.name,
        login: user.login,
        authorization: jwtEncoded,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  patchUserInfo: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data = patchSchema.parse(req.body);

      const user = await prisma.user.update({
        data: {
          ...data,
        },
        where: {
          id,
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const treatedZodErrors = error.issues.map((issue) => {
          return {
            message: issue.message,
            path: issue.path,
            code: issue.code,
          };
        });
        return res.status(400).json({ error: treatedZodErrors });
      }
      return res.status(500).json(error);
    }
  },
  deleteUserById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};
