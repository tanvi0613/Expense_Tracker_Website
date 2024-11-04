const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//User Registration
const usersController = {

    //REGISTER
    register : asyncHandler(async(req,res) => {
        const {username, email, password} = req.body
        
        //Validate
        if(!username || !email || !password){
            throw new Error("All fields are required");
        }


        //Check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error("User already exists");
        }

        //hash user password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //Create user and save in db
        const userCreated = await User.create({
            email, username,password: hashedPassword
        })

        //Send the response
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id
        });
    }),


    //LOGIN
    login : asyncHandler(async(req,res) => {
        const {email, password} = req.body
        
       //Check if email is valid
       const user = await User.findOne({email});
       if(!user){
        throw new Error('Invalid login credentials');
       }

       //Compare user password
       const isMatch = await bcryptjs.compare(password, user.password);
       if(!isMatch){
        throw new Error('Invalid login credentials');
       }

       //Generate a token
       const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn: "30d"});

        //Send the response
        res.json({
            message: 'Logged in successfully',
            token,
            id: user._id,
            email:user.email,
            username: user.username
        });
    }),


    //PROFILE
    profile: asyncHandler(async(req,res) => {
        //Find the user
        const user = await User.findById(req.user);
        if(!user){
            throw new Error('User not found')
        }

        //Send the response
        res.json({
            username: user.username,
            email:user.email
        })
    }),


    //CHANGE PASSWORD
    changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    //Find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    //Hash the new password before saving
    //Hash the user password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;

    //ReSave USER
    await user.save({
      validateBeforeSave: false,
    });

    //!Send the response
    res.json({ message: "Password Changed successfully" });
  }),


  //UPDATE USER PROFILE
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    res.json({ message: "User profile updated successfully", updatedUser });
  })
}

module.exports = usersController