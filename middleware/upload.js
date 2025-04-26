const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    // Creating unique file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize upload with storage options
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|pdf/; // Allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPG, JPEG, PNG, and PDF files are allowed.'));
    }
  },
}).single('otrCard'); // 'otrCard' is the name of the form input for the file

module.exports = upload;
