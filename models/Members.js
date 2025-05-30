import mongoose from "mongoose";

const memberSchema = new mongoose.Schema ( {

memberName : {
    type : String ,
    required : true,
},
email : {
    type : String ,
    required : true,
    unique : true,
},
mobileNumber : {
    type : Number ,
    required : true,
},
age : {
    type : Number,
}
} , {timestamps : true})

const Members = mongoose.model ( 'Members' , memberSchema)

export default Members;