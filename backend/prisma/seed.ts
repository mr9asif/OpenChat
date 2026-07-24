import bcrypt from "bcrypt";
import { Role } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import config from "../src/config";

async function main() {
  const email = config.admin_email;
  const password = config.admin_password;
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  await prisma.user.create({
    data: {
      name: "System Admin",
      email: "admin@openchat.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("✅ Admin created successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
