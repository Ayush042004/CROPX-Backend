import jwt from 'jsonwebtoken'
import { Farmer } from '../models/user.model.js'

export const verifyJWT = async (req, res, next) => {
    
    const token = req.cookies?.accessToken;

    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user = await Farmer.findById(decoded._id)

    if(!user) throw new Error("Invalid Access Token")

    req.user = user;
    next();
}