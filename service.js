import express from "express";
import cors from "cors";
import userAuthRouter from "./routes/userAuthRouter.js";
import dotenv from "dotenv";
import db_connection from "./services/connection/dbConnection.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const db_url = process.env.DB_URL;

app.use(cors());

app.use("/auth", userAuthRouter);

db_connection(db_url).then(() => {
  app.listen(port, () => console.log(`Server started at: http://localhost:${port}`));
});
