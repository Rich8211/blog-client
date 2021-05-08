const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

require("dotenv").config();

const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    region: "us-east-2",
});


const storage = multerS3({
  acl:"public-read",
  s3,
  bucket: "mern-blog-header-images",
  metadata: function(req, file, cb) {
      cb(null, {fieldName: "TESTING_METADATA"});
  },
  key: function(req,file,cb) {
      cb(null, Date.now().toString)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/jpeg"
      ) {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
  },
});

module.exports = upload;