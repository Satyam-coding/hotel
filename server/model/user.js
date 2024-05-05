
import mongoose from "mongoose";


const ContactSchema= new mongoose.Schema({
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    status:{
        type:Boolean,
        default:false
    }
})

const user = new mongoose.model("user",ContactSchema);
export default user;