import mongoose,{Schema} from "mongoose"

const cartSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    buyerId:{
        type: Schema.Types.ObjectId,
        ref: 'Farmer',
    },
    quantity:{
        type: Number,
        default: 1
    }
})

export const Cart = mongoose.model("Cart", cartSchema)