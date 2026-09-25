const express = require("express");
const postModel = require("./models/post.model");
const multer = require("multer");
const uploadImage = require("./services/storage.service")
const cors = require('cors')



const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({storage : multer.memoryStorage()})

// APIs

app.post("/create-post",upload.single("image"), async (req,res)=>{
    const result = await uploadImage(req.file.buffer);
    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption
    })
    
    res.status(201).json({
        message:"Post Created Successfully",
        post
    })
})

app.delete("/posts/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        await postModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Post Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error Deleting The Post"
        })
        
    }
})

app.get("/posts", async (req,res)=>{
    const posts = await postModel.find({})
    res.status(200).json({
        message:"Posts fetched Successfully",
        posts: posts
    })
})

module.exports = app;
