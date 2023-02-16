import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/connection";
import { uploadSchema } from "../validator/image/uploadImageValidator";

export const imageController = {
  uploadImage: async (req: Request, res: Response) => {
    try {
      const { name, size, src, userId } = uploadSchema.parse(req.body);
      console.log(req.body);

      const image = await prisma.galery.create({
        data: {
          name,
          size,
          src,
          userId,
        },
      });
      return res.status(200).json({ image });
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
  getImagesByUserId: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const galery = await prisma.galery.findMany({
        where: {
          userId: id,
        },
      });
      return res.status(200).json({ galery });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  DeleteImageById: async (req: Request, res: Response) => {
    try {
      const deletedImage = await prisma.galery.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.status(200).json({ deletedImage });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
