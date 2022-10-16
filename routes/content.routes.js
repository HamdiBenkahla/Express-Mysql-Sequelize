const express = require('express');
const router = express.Router();
const {uploadImage,upload,updateImage} = require('../controller/content');


router.post('/upload',upload,uploadImage);

router.put('/upload/:id',upload,updateImage);

module.exports = router