const mongoose = require('mongoose');

const conn = async(req,res) =>{
    try{
        await mongoose.connect("mongodb+srv://abhishekraj03082001:abhitodo123@cluster0.qgfees5.mongodb.net/").then(()=>{
        console.log("Database is connected successfully");
    });
    }catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};
conn();