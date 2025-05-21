import mongoose from "mongoose";

const AdminRegisterSchema = new mongoose.Schema({
    Username : {
        type : String,
        required : true,
        unique : true,
    },Name : {
        type : String,
        required : true,
    }, email : {
        type : String,
        required : true,
    }, mobileNumber : {
        type : Number,
        required : true,
    }, password : {
        type : String,
        required : true,
    }
},{timestamps:true})

const AdminRegister = mongoose.models.AdminRegister || mongoose.model("AdminRegister" , AdminRegisterSchema);



export default AdminRegister;