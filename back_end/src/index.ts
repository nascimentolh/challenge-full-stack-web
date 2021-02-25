import { createConnection } from "typeorm";
import app from "./config/express";

const PORT = process.env.PORT || 3000;

createConnection()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running: ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.log(`Database connection failed: ${error}`);
  });
