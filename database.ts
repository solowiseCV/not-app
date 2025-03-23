import mongoose from "mongoose";
import constants from "./constants";

const database = async (): Promise<void> =>{
try {
   await mongoose.connect(constants.DATABASE_URI); 
        // useCreateIndex: true,
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        console.log(" yah! mongoDB is connected");
    } catch (error)  {
        console.error("There was an error while connecting to the database:",error )
        process.exit(1);
    };
}


export default database;