import mongoose from "mongoose";

// connect database function
// to connect use mongoose

export const connectDatabase = ()=>{
    mongoose.connect("mongodb://localhost:27017/team_14_3_30")
    .then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("----connection error----")
        console.log(err);
    });
};