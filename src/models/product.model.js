import mongoose,{Schema} from "mongoose"

const productSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    category:{
        type:String,
        required: true,
        enum: ["Seeds", "Fertilizers", "Pesticides","Tools", "Machinery", "Other"]
    },
    price: {
        type:Number,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{ collection: "products" })

export const Product = mongoose.model("Product", productSchema)