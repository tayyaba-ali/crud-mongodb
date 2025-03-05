import mongoose from "mongoose";
import 'dotenv/config'
import chalk from "chalk";
const url = process.env.MONGODB_URL
console.log(url)

const connectToDb= async()=>{

    try{
        await mongoose.connect(url,{dbName:"ecommerce"})
        console.log(chalk.white.bgGreen("connected to MongoDB"))
    }
    catch(error){
        console.error("error in connecting to db",error)
    }
}

export default connectToDb