const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
require("./db/index.js");

const app = express()
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
dotenv.config()

const userRouter = require("./routers/routes/user")
app.use("/user", userRouter)

const lessonRouter = require("./routers/routes/lesson")
app.use("/lesson", lessonRouter)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });