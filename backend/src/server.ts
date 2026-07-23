import { prisma } from "../lib/prisma.js";
import app from "./app.js";

const port = 5000;
const main = () => {
  app.listen(port, async () => {
    try {
      await prisma.$connect();
      console.log("Connected to the database successfully.");
      console.log(`server is running on port ${port}`);
    } catch (error) {
      console.log(error);
      await prisma.$disconnect();
      process.exit(1);
    }
  });
};

main();
