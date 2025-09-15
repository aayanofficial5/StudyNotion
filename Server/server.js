const express = require("express");
const dbConnect = require("./Configurations/database");
const cookieParser = require("cookie-parser");
const cloudinaryConfig = require("./Configurations/cloudinary");
const fileUpload = require("express-fileupload");
const userRoutes = require("./Routes/User");
const courseRoutes = require("./Routes/Course");
const paymentRoutes = require("./Routes/Payments");
const profileRoutes = require("./Routes/Profile");
const chatRoutes = require('./Routes/Chat');

const app = express();
require("dotenv").config();
const cors = require("cors");
const { auth } = require("./Middlewares/Authentication/auth");
const { isStudent } = require("./Middlewares/Authorization/isStudent");
const port = process.env.PORT || 4000; // Use PORT for the server

// MIDDLEWARES
// cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// request body json data parser
app.use(express.json());
// cookie data parser
app.use(cookieParser());
// express-fileupload to recieve files from client
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// mapping of routes with app
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", auth,isStudent, paymentRoutes);
app.use("/api/v1/profile", auth, profileRoutes);
app.use('/api/v1/chat', chatRoutes);


// default route
app.get("/", (req, res) => {
  console.log("server is up and running...");
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// server starting
app.listen(port, () => {
  console.log(`server is running on port ${port}...`);
});

// database connection
dbConnect();

// cloudinary connection
cloudinaryConfig();
