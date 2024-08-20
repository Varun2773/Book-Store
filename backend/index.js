import express, { request, response } from "express";
import { PORT, mongoDBURl } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//midleware for parsing request body
app.use(express.json());

//midlewware for handling CORS POLICY
//option 1
app.use(cors());
//option 2
// app.use(
//   cors({
//     origin: "http://localhost:5555",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["content-type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to mern stack book store project backend ");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURl)
  .then(() => {
    console.log("app is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
