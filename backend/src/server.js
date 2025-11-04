import express from "express";
import { ENV } from "./lib/env.js";
// import { ENV } from "./lib/env";

const app = express();

console.log(ENV.PORT);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running",
  });
});

app.listen(3000, () => {
  console.log("Server is running on PORT 3000:", ENV.PORT);
});
