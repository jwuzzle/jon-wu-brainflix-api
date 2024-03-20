const express = require("express");
const app = express();
const videosRoutes = require('./routes/videos');
const cors = require("cors");
const path = require("path");


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

app.listen(8000, () => 
    console.log('Server listening on port 8000')
);
