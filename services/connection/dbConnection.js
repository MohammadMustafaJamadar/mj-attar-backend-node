import mongoose from "mongoose";

const db_connection = async(db_url)=>{
    try {
        await mongoose.connect(db_url)
        console.log("Database connected!")
    } catch (error) {
        console.log("Database disconnected!")
        process.exit(0)
    }
}

export default db_connection;