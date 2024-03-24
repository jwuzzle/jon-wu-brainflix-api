const express = require("express");
const app = express();
const videosRoutes = require('./routes/videos');
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const pathandtimeMiddleware = (req, res, next) => {
    console.log(`Requested URL: ${req.url}`);
    const requestTime = new Date().toLocaleString("en-US");
    console.log(requestTime);
    next();
};
app.use(pathandtimeMiddleware);

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/public/images")));

app.use('/videos', videosRoutes);

app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
);
