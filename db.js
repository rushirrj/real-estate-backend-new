const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    // mongoose.connect(mongoURI, () => {
    //     console.log("MongoDB connected succesfully");
    // });
    mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
});
}

// mongoose.connect(mongoURI)
//   .then(() => {
//     console.log("MongoDB connected successfully");
//   })
//   .catch(error => {
//     console.error("MongoDB connection error:", error);
// });

module.exports = connectToMongo;