
const mongoose= require("mongoose");

const connectDB= async()=>{


    try{

     mongoose.set('strictQuery',false)       //to remove warnings from the command line
     const conn= await mongoose.connect(process.env.MONGO_DB);
     console.log(`Database connected ${conn.connection.host}`);


    }catch(error){
          console.log(error);
          process.exit(1);
    }
}

module.exports = connectDB