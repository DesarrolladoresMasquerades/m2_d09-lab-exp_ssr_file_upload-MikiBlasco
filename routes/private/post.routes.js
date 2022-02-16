const router = require("express").Router();
const {isLoggedIn} = require("../../middleware/route-guard")

const fileUploader = require("../../config/cloudinary.config");
const PostModel = require("../../models/Post.model");
/* GET home page */

router.get("/",isLoggedIn, (req, res, next) => {

  res.render("post/create-post");
});

router.route("/create")
.get((req,res)=>{
  res.render('post/create-post')
})
.post(fileUploader.single("imgUrl"), (req,res)=>{
    const content = req.body.content;
    const id = req.session.user._id;  
    const imgUrl = req.file.path;
    const picName = req.body.picName;

    PostModel.create({content,creatorId:id,picPath:imgUrl,picName})
    .then(post=>res.render("post/post-details",post))
})

router.route("/gallery")
.get((req,res)=>{
    PostModel.find()
    .then( posts=> {
        res.render('index', {posts})
    })
})
.post((req,res)=>{
    
        //posts => res.render('post/show-posts', posts))
})

module.exports = router;