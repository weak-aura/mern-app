const express = require("express");
const {create, getAllPosts, deletePost, getOnePost, getMyPosts} = require("../controllers/post.controller");
const {authValidation} = require("../middleware/tokenValidation");
const {uploadFile} = require("../middleware/multer");

const router = express.Router();

router.post("/create", authValidation, uploadFile, create)
router.get("/getAllPosts", getAllPosts)
router.get("/getOnePost/:id", getOnePost)
router.get("/getMyPosts/",authValidation, getMyPosts)
router.delete("/deletePost/:id",authValidation, deletePost)

module.exports.postRoutes = router