import app from "./app.js";
const port = 5000;
const main = () => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
};

main();
