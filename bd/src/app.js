import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import filesRoutes from "./routes/files.routes.js";
import userRoutes from "./routes/user.routes.js"

const app = express()


app.use(cors())

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/healthcheck", (req, res) => {
  res.send("Healthy");
});


// Routes 
app.use('/api/files', filesRoutes);
app.use("/api/users", userRoutes);


// cron.schedule("0 0 * * *", async () => {
//   await deleteOldUploads();
// });

// console.log("Cron job scheduled to run every 24 hours.");

// http://localhost:8000/api/v1/users/register

export { app }