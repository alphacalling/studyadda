const mongoose = require("mongoose")
require("dotenv").config()

const { MONGODB_URL } = process.env

exports.connect = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URL)
    console.log(`Database connected successfully ${connection.connection.host}`)
  } catch (error) {
    console.log("Database connection failed", error)
    process.exit(1)
  }
}
