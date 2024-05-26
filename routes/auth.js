const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

// register

router.post("/register", async(req,res) =>{
    try {
        const {username,email,password}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hashSync(password,salt);
        const newUser=new User({username,email,password:hashedPassword});
        await newUser.save().then(() => res.status(200).json({message: "User is successfully registered"}));
    } catch (error) {
        res.status(200).json({message: "user already exists"});
    }
});

// login 

router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
       
        if(!user){
            return res.status(400).json("User not found!")
        }
        const match=await bcrypt.compareSync(req.body.password,user.password)
        
        if(!match){
            return res.status(200).json("Wrong password!")
        }
        const { password, ...others} = user._doc;
        res.status(200).json({ others });
        
    }
    catch(err){
        res.status(200).json({message: "user already exists"});
    }
});

module.exports = router;