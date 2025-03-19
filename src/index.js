import dotenv from 'dotenv';
dotenv.config({
    path: '../.env'
});
import { connectDB } from "./db/connectDB.js";
import { app } from "./app.js";


connectDB()
    .then(() =>
        app.listen(3000,()=>{
<<<<<<< HEAD
        console.log("Listening on")
=======
        console.log("Listening")
>>>>>>> 85d2f0e78f4791f25c6060fdc181ba28dd38cfa9
        }
    ))
    
