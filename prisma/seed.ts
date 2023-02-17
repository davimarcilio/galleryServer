import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function main() {
  const defaultUser = await prisma.user.create({
    data: {
      login: "teste",
      name: "teste",
      password: bcrypt.hashSync("123456", Number(process.env.SALT_ROUNDS)),
    },
  });
  console.log(defaultUser);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
