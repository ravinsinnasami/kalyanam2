import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.admin.create({
    data: {
      password: "ssrd2236" // Change this!
    }
  });
  console.log("Admin created");
}

main();
