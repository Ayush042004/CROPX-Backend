import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import { Farmer } from '../models/user.model.js';


const generateAccessAndRefreshTokens = async(farmerId)=>{
    try {
        const farmer = await Farmer.findById(farmerId);
        
        const accessToken = farmer.generateAccessToken();
        
        const refreshToken = farmer.generateRefreshToken();
        
        farmer.refreshToken = refreshToken
        
        await farmer.save({validateBeforeSave: false}) // yeh isliye kiya h kyuki vrna yeh dubara sara data validate krta password vagera ab yeh bs tokens save krega

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500, "Failed to generate tokens")
    }
}


export const registerFarmer = async(req,res)=>{
    console.log(req.body);
    
    try {
        const {name,phoneNumber,aadharNumber,password} = req.body;
    
        if(
            [name,phoneNumber,aadharNumber,password].some((field)=> field?.trim()==="" )
        ){
            throw new Error("Fill all the fields");
        }

        const existedfarmer = await Farmer.findOne(
            {
                $or:[
                    {
                        phoneNumber
                    },
                    {
                        aadharNumber
                    }
                ]
            }
        )

        if(existedfarmer){
            throw new Error("farmer Already exists");
        }
        
        const farmer = await Farmer.create({
            name,
            phoneNumber,
            aadharNumber,
            password
        })
        console.log("farmer created");
        
        return res.status(200).
        json(
            {
                farmer:farmer.name,
                message:"farmer created successfully"
            }
        )
    } catch (error) {
        console.log("Error while registration",error.message);
    }
}


export const loginFarmer = async(req,res)=>{
    try {
        const {phoneNumber,password} = req.body;
    
        if([phoneNumber,password].some((field)=>field?.trim()=="")) throw new Error("Fill all the fields")
        
        const farmer = await Farmer.findOne({
            $or:[
                {phoneNumber}
            ]
        })
    
        if(!farmer){
            throw new Error("farmer not found");
        }
    
        const isMatch = await farmer.isPaswordCorrect(password);
    
        if(!isMatch) throw new Error ("Incorrect Credentials");
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(farmer._id)
    
        const options = {
            httpOnly : true,
            secure: true
        }
    
        return res
                .status(200)
                .cookie("accessToken",accessToken,options)
                .cookie("refreshToken",refreshToken,options)
                .json({
                    farmerName: farmer.name,
                    message:"farmer logged In successfully"
                })
    } catch (error) {
        console.log("Error wqhile login",error.message);
        
    }



}

export const logoutFarmer = async(req,res)=>{

    try {
        Farmer.findByIdAndUpdate(
            req.farmer._id,
            {
                $unset: {
                    refreshToken: 1
                }
            },
            {
                new: true
            }
        )
    
        const options = {
            httpOnly: true, 
            secure: true
        }
    
        return res
                .status(200)
                .clearCookie("accessToken",options)
                .clearCookie("refreshToken",options)
                .json({
                    message:"farmer logged out"
                })
    } catch (error) {
        console.log("Error while logging out",error.message);
    }
}

export const refreshAccessToken = async(req,res)=>{

    try {
        const incomingRefreshToken = req.cookies.refreshToken
    
        if(!incomingRefreshToken){
            throw new Error("Unauthorized Request")
        }
    
        const decodedToken = jwt.verify( 
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const farmer = Farmer.findById(decodedToken?._id)
    
        if(!farmer){
            throw new Error("Invalid Refresh Token")
        }
    
        if(farmer.refreshToken!==incomingRefreshToken)throw new Error("Invalid Token is expired or used")
    
        const {accessToken, refreshToken}= await generateAccessAndRefreshTokens(farmer._id);
        const newRefreshToken = refreshToken;
    
        const options = {
            httpOnly : true,
            secure: true
        }
    
        return res
                .status(200)
                .cookie("accessToken",accessToken,options)
                .cookie("refreshToken",newRefreshToken,options)
                .json("Access Token Refreshed")
    } catch (error) {
        console.log("Error while refreshing the token",error.message);        
    }
}

export const changeCurrentPassword = async(req,res)=>{

    try {
        const {oldPassword, newPassword} = req.body;
    
        const farmer = Farmer.findById(req.farmer?._id);
    
        const isPasswordCorrect = farmer.isPasswordCorrect(oldPassword);
    
        if(!isPasswordCorrect) throw new Error("Old Password is incorrect");
    
        farmer.password = newPassword;
        farmer.save({validateBeforeSave: false})
    
        return res
                .status(200)
                .json("Password Changed Successfully");
    } catch (error) {
        console.log("Error while changing password",error.message);        
    }
}

export const getCurrentUser = async(req,res)=>{
    return res
            .status(200)
            .json({
                user: req.user,
                message:"Current user fetched successfully"
            })
}