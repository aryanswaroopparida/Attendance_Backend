import { Schema,model } from "mongoose";

const userSchema = new Schema({
    email : {
        type : String,
        unique : true,
        index : true,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    branch : {
        type : String,
        required : true
    }
})

export const userModel = model("User",userSchema)

