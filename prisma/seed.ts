import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@digitalheroes.com" },
    update: {},
    create: {
      email: "admin@digitalheroes.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const member = await prisma.user.upsert({
    where: { email: "member@digitalheroes.com" },
    update: {},
    create: {
      email: "member@digitalheroes.com",
      name: "Member User",
      password: hashedPassword,
      role: "MEMBER",
    },
  });

  console.log({ admin, member });
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
