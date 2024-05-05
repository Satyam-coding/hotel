import express from "express";
import {connectdb} from "./connectdb.js"
import router from "./routes/route.js";
import cors from "cors"

const app = express();
const port= process.env.PORT || 7000;


var corsOptions = {
  origin: "http://localhost:5173",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "credentials":true
}
app.use(express.json());
app.use(cors(corsOptions))
app.use("/api", router);

connectdb();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});