const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the file system module

const storage = multer.memoryStorage();


// Create the upload middleware
const upload = multer({ storage: storage });

module.exports = upload;