const mongoose = require("mongoose");

module.exports.runMongoDB = (uri) => {
  return new Promise(async (resolve, reject) => {
    try {
      const con = await mongoose.connect(uri)
      resolve(con)
    }catch (error) {
      reject(error)
    }
  })
}

