import express from "express";
import reminderRoutes from "./routes/reminderRoutes.js";

const app = express();

app.use(express.json());

app.use("/reminders", reminderRoutes);

app.listen(3001, () => {
  console.log("Example app listening on port 3001");
});