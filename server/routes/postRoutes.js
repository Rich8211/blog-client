const router  = require("express").Router();
const Post = require("../models/postModel");
const upload = require("../middleware/fileUpload");


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./public/");
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(" ").join("-");
//         cb(null, uuid() + "-" + fileName);
//     },
// });

const singleUpload = upload.single("postImage");

router.post("/images", upload.single("postImage"), async (req, res) => {
    res.json(req.file)
    // res.json(req.isAuthenticated());
    // singleUpload(req, res, function (err) {
    //     if (err) {
    //       return res.json({
    //         success: false,
    //         errors: {
    //             title: "Image Upload Error",
    //             detail: err.message,
    //             error: err,
    //             },
    //         });
    //     }
    // });
})

router.post("/", upload.single("postImage"), async (req, res) => {
    const {title, createdAt, tags, body, author} = req.body;
    try{ 
        if (req.isAuthenticated()) {
            const newPost = new Post({
            postImage: req.file.location,
            title,
            createdAt,
            tags,
            body,
            author
        })
        const savedPost = await newPost.save();
        res.json(savedPost);
        } else res.json("Not Authenticated")
        
    }
    catch (err){
        console.error(err)
    }
    
});

router.get("/", async (req,res) => {

    try {
        const {limit, skip} = req.query;

        let posts;

        if (!skip ) {
           posts = await Post.find().limit(parseInt(limit)); 
        }

        else posts = await Post.find().skip(parseInt(skip)).limit(parseInt(limit)); 

        
        res.json(posts);
    }

    catch (err) {
        console.log(err);
    }
    
});

router.get("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

router.get("/info/count", async(req,res) => {
    try {
        const count = await Post.countDocuments();
        res.json(count);
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;
