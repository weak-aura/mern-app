const {PostModel} = require("../models/post.model");
const {UserModel} = require("../models/auth.model");
const {uploadStreamPromise} = require("../utils/cloudinary");
const create = async (req, res) => {
  try {
    const {title, description} = req.body;
    const userId = req.userId
    let imageUrl
   

    if (req.errorMessage) {
      return res.status(415).json({error: "Поддерживаются только форматы изображений PNG и JPG"})
    }

    if (title.length < 6 || description.length < 6) {
      return res.status(411).json({error: "Необходимо ввести 6 или более букв"})
    }

    const getAuthor = await UserModel.findById(userId).select("-password",);
    const authorPosts = await PostModel.find({authorId: userId});
    if (authorPosts.length + 1 > 3) {
      return res.status(400).json({error: "Лимит на создание поста превышен. Максимальное количество 3"})
    }
    
    if(req.file?.buffer) {
      const cloudinaryImageUrl = await uploadStreamPromise(req.file.buffer)
      imageUrl = cloudinaryImageUrl.secure_url
    } else {
      imageUrl = "https://flowbite.com/docs/images/blog/image-1.jpg";
    }
    

    const newPost = new PostModel({
      author: getAuthor,
      authorId: userId,
      title,
      description,
      imageUrl: imageUrl,
    })

    if (newPost) {
      await newPost.save();
      res.status(201).json({message: "Пост создан", post: newPost, status: "created"})
    }

  } catch (error) {
    console.log("Error in create post request:", error.message)
    res.status(500).json({error: "Internal Server Error: Create Posting"})
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()

    res.status(201).json({
      message: "Данные успешно получены",
      posts,
      status: "getAllPosts"
    })
  } catch (error) {
    console.log("Error in getAllPosts:", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

const deletePost = async (req, res) => {
  try {
    const {id} = req.params;
    const authorizedUser = req.userId

    const post = await PostModel.findById(id)
    if (!post) {
      return res.status(404).json({message: "Пост не найден"});
    }

    if (post.author._id.toString() === authorizedUser._id.toString()) {
      await PostModel.findByIdAndDelete(id);
      return res.status(200).json({message: "Этот пост был успешно удален.", status: "deleted"});
    } else {
      return res.status(403).json({error: "Вы не можете удалить этот пост, так как Вы не являетесь его автором."});
    }

  } catch (error) {
    console.log("Error in deletePost:", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

const getOnePost = async (req, res) => {
  try {
    const {id} = req.params
    const post = await PostModel.findById(id)
    if (!post) {
      return res.status(404).json({error: "Такого поста не сущестует"})
    }

    res.status(200).json({message: "Данные поста успешно получены", post})
  } catch (error) {
    console.log("Error in getOnePost:", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

const getMyPosts = async (req, res) => {
  try {
    const authorizedId = req.userId
    const posts = await PostModel.find({authorId: authorizedId});

    res.status(200).json({message: "Ваши посты найдены", posts})
  } catch (error) {
    console.log("Error in getMyPosts:", error.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}


module.exports = {create, getAllPosts, deletePost, getOnePost, getMyPosts}
















