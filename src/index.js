import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env"
});


connectDB()







// import express from "express";

// const app = express();




// const connectDB = async () => {
//   try {
//     mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}` )
//     app.on("error", (error) => {
//       console.error("MongoDB connection error: ",error);
//       throw error;
//     })


// app.listen(process.env.PORT, () => {
//   console.log(`Server listening on port ${process.env.PORT}`);
// })

//   } catch (error) {
//     console.error("MongoDB connection error: ",error);
//     throw error;
//   }
// }



