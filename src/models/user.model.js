import mongoose,{Schema} from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"


const farmerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    aadharNumber:{
        type:String,
        required:true
    },
    location:{
        type:String,
    },
    landSize:{
        type:Number,
    },
    soilType:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }

})

farmerSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

farmerSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

farmerSchema.methods.generateAccessToken = async function(){
    jwt.sign(
        {
            _id:this._id,
            name:this.name,
            aadharNumber:this.aadharNumber
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

farmerSchema.methods.generateAccessToken = async function(){
    jwt.sign(
        {
            _id:this._id,
            name:this.name,
            aadharNumber:this.aadharNumber
        },
        process.env.ACCESS_REFRESH_SECRET,
        {
            expiresIn: process.env.ACCESS_REFRESH_EXPIRY
        }
    )
}

export const Farmer = mongoose.model("Farmer", farmerSchema)