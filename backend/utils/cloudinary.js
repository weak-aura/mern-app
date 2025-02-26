const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const options = {
  timestamp: new Date().getTime(),
  resource_type: "image"
}

const uploadStreamPromise = (buffer) => {
  return new Promise(async(resolve, reject) => {
    const uploadStream =  await cloudinary.uploader.upload_stream(options, (error, result) => {
      if(error) {
        reject(error)
      }else {
        resolve(result)
      }
    })
    uploadStream.end(buffer)
  })
}

module.exports = {cloudinary, uploadStreamPromise};
