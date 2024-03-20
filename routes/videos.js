const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')

const FILE_PATH = "./data/videos.json";

const readVideos = () => {
    const videosFile = fs.readFileSync(FILE_PATH);
    const videos = JSON.parse(videosFile);
    return videos;
}

//GET all videos 
router.get('/', (req, res) => {
    const videos = readVideos()
    res.status(200).json(videos); 
})

//GET single video
router.get('/:id', (req, res) => {
    const videos = readVideos()
    const { id } = req.params
    
    const individualVideo = videos.find((video) => video.id === id)

    if (individualVideo) {
        res.status(200).json(individualVideo);
    }else{
        res.status(404).send('Video not found.');
    }
});


//POST a new video
router.post('/', (req, res) => {
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: "Author Name",
        image: "http://localhost:8000/images/Upload-video-preview.jpg",
        description: req.body.description,
        views: "0",
        likes: "0",
        duration: "49:20",
        video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: []
    };

    const videos = readVideos();
    videos.push(newVideo);
    fs.writeFileSync(FILE_PATH, JSON.stringify(videos));

    res.status(201).json(videos);

});

module.exports = router;