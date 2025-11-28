import express from "express";
import { ENV } from "./lib/env.js";
// import { ENV } from "./lib/env";
import path from "path";

const app = express();
const __dirname = path.resolve(); // return current dir name

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "this is the book end point" });
});

//make for app ready for the deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // If any route is not an API route, always return index.html so React Router can handle it.
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(3000, () => {
  console.log("Server is running on PORT 3000:", ENV.PORT);
});
