import express from "express";
import { ENV } from "./lib/env.js";
// import { ENV } from "./lib/env";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { functions, inngest } from "./lib/inngest.js";

const app = express();
const __dirname = path.resolve(); // return current dir name

app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

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

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server is running on PORT 3000:", ENV.PORT);
    });
  } catch (err) {
    console.error("Server is not start get error");
  }
};

startServer();
