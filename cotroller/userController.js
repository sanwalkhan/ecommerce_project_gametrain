import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


// User Registration

export const registerUser =async(req, res)=>{
    try{
        const {email, password, confirmPassword, isAdmin, firstName, lastName} = req.body;

         if (!password || !confirmPassword || !email || !firstName || !lastName){
            return res.status(400).send("Please fill all required fields");
         }
      
         const emailExists = await User.findOne({email});
      
         if(emailExists){
            return res.status(401).send({message:"Email is already in use, try another"});
         }
         if(password!==confirmPassword){
            return res.status(401).send({message:"Passwords doesn't match, please try again"});
         } else{
      
            const encryptPassword = await bcrypt.hash(password, 5);
            const newUser = new User({email,password:encryptPassword,
                isAdmin, firstName, lastName});
         
            await newUser.save();
            return res.status(201).send({message: "User created successfully", User:newUser});
         }

    }catch(error){
        res.status(500).send({message: error.message})
    }
}


// User Login

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).send({message: 'Email, password or both are incorrect'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return res.status(401).send({message: 'User no found.! Please register'});
        }

        const token=jwt.sign({userId:user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn:"1h"});
            res.status(200).send({message: "Login successful", token});
        } catch (error) {
            res.status(500).send({message: error.message});
         }
}




// reset password
// update password
export const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const { userId } = req.user;
        const user = await User.findById(userId);

        const passwordValid = await bcrypt.compare(oldPassword, user.password);

        if (!user) {
            return res.status(404).send({ message: "User doesn't exist" });
        }

        if (!passwordValid) {
            return res.status(400).send({ message: "Please type the correct password" });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).send({ message: "Please make sure both new passwords and confirmed passwords are the same" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}






//get all Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users) {
            res.status(200).send(users);
        } else {
            res.status(404).send({ message: 'No users found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// get single user .

export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}



// update User 
export const updateSingleUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        

      });
      if (user) {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Delete User

export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (user) {
        res.status(200).json({ message: `Deleted ${user.title}` });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  