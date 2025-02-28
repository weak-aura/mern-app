const express = require("express");
const {create, getAllPosts, deletePost, getOnePost, getMyPosts} = require("../controllers/post.controller");
const {verifyAuth} = require("../middleware/tokenValidation");
const {uploadFile} = require("../middleware/multer");

const router = express.Router();

router.post("/create", verifyAuth, uploadFile, create)
router.get("/getAllPosts", getAllPosts)
router.get("/getOnePost/:id", getOnePost)
router.get("/getMyPosts/",verifyAuth, getMyPosts)
router.delete("/deletePost/:id",verifyAuth, deletePost)

module.exports.postRoutes = router