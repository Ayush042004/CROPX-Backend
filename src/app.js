import express from 'express'
import cookieParser from "cookie-parser"
import cors from 'cors'


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true  
}));

app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())

import userRoutes from './routes/user.routes.js';
import weatherRoutes from './routes/intelligence.routes.js'
import diseaseRoutes from './routes/disease.routes.js'
import marketRoutes from './routes/market.routes.js'

app.use("/api/v1/farmers",userRoutes)
app.use("/intelligence",weatherRoutes)
app.use("/Disease-Analysis",diseaseRoutes)
app.use("/market-place",marketRoutes)


export{app}