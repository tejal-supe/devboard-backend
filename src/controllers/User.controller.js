import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import config from "../config/environment.js";
import User from "../models/User.model.js";

export const registerUserController = async (req, res) => {
  try {    
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName || !emailId || !password) {
      return res.status(400).json({ message: "Enter all the User details" });
    }
    const exisitingUser = await User.findOne({ emailId });
    if (exisitingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password,
    });
    if (!newUser) {
      return res.status(400).json({ message: "Error while creating a user" });
    }
     res.status(201).json({
       message: "User Registered Successfully!",
       success: true,
     });
  } catch (error) {
    console.log("Error in the register user controller", error);
  }
};

export const loginUserController  = async (req,res) => {
    try {
        const {emailId,password} = req.body;
        if(!emailId || !password){
            return res.status(400).json({message:"Please Enter the details"});
        }
        const userData = await User.findOne({emailId});
        if(!userData){
             return res
               .status(400)
               .json({ message: "The Entered EmailId or Password doesn't exist" });
        }
        const passwordMatch = await bcrypt.compare(password,userData.password);
        if(!passwordMatch){
              return res
                .status(400)
                .json({
                  message: "The Entered EmailId or Password doesn't exist",
                });
        }
        const token = jwt.sign({id:userData._id},config.jwt_secret,{
            expiresIn:config.jwt_expiry
        })

       const cookieOptions = {
         httpOnly: true,
         secure: true,
         maxAge: 24 * 60 * 60 * 1000,
       };
       res.cookie("token", token, cookieOptions);
         res.status(201).json({
           message: "User logged in succesfully",
           success: true,
           user: {
             id: userData._id,
             firstName: userData.firstName,
             lastName: userData.lastName,
           },
         });
    } catch (error) {
        console.log("Error in Login Controller", error);
        
    }
}
