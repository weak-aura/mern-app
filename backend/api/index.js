require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {runMongoDB} = require("../lib/mongodb");

// routes
const {authRoutes} = require("../routes/auth.routes");
const {postRoutes} = require("../routes/post.routes");

const app = express();
const PORT = process.env.PORT || 8080;
const origin = process.env.CORS_MODE_DEVELOPMENT 


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: origin, 
  credentials: true,
}));

app.get("/", (req, res) => {
  res.status(200).json({message: "ok"})
})

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes)


runMongoDB(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongodb")
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log("Error connection to mongodb", error)
  })

