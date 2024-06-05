const authentication = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")




//REGISTER A USER
const registerUser = async(req, res)=>{

  try{

    const {email, fullname, password} = req.body

    //check if user is already registered
    const ExistingUser = await authentication.findOne({email})

       if(ExistingUser){
        return res.status(400).json({
          message: "User already Exist!"
        })

       }
      //hashe the password and set new password to be existing password
      const hashedPassword = await bcrypt.hash(password, 12)

    const Users = new authentication({email, fullname, password: hashedPassword})
         await Users.save()
         //send email to users
        
         //const response = await sendEmail({email, username,emailSubject })

        return res.status(200).json({ 
            message: "successful",
            user: {email, fullname }    
    }) 
  } catch (error) {
    return res.status(500).json({message: error.message})
  } 

  }
  
  //login user
  const loginUser = async(req, res)=>{

    try{

      const {email, password} = req.body

    const User = await authentication.findOne({email})
    
// checking password match

const matchPassword = bcrypt.compare(password, User.password)

//generate pass token to grant user access using jsonwebtoken

const userPayload = {
  id: User._id,
  email: User.email
}
const passToken = await jsonwebtoken.sign(userPayload, process.env.PASSTOKEN,
   {expiresIn: '30d'})

return res.status(200).json({
  message: "login successful",
  passToken,
  User
})

    } catch (error) {
    return res.status(500).json({message: error.message})
  } 

    }
  
//GET ALL THE REGISTERED USERS
const getAllUsers = async(req, res)=>{ 

  try{

    const user = await authentication.find()
  return res.status(200).json({
    message: "The total Number of Event users are..",
    count: user.length,
    user
})

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  }

  //GET ONLY ONE USER
  const getOneUser = async(req, res)=>{
    try{
      const { id } = req.params
    const oneUser = await authentication.findById(id)
    return res.status(200).json({
        message: "successfull",
        oneUser
    })
  
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }

  //UPDATE USER PASSWORD
  const updatePassword = async(req, res)=>{

    try{
    const { id } = req.params
    const {password} = req.body
    const updatedPassword = await authentication.findByIdAndUpdate(
    id,
    {password},
    {new: true}
  )
    return res.status(200).json({
      message: "password updated successfully.",
      user: updatedPassword 
    })
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
    
  }
  
//DELETE ONE USER
  const deleteUser = async(req, res)=>{
    try{

      const { id } = req.params
    const deletedUser = await authentication.findByIdAndDelete(id)

    return res.status(200).json({
      message: "deleted successfully."
    })
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
const forgetPassword = async(req, res)=>{

  try{
    const { email } = req.body
  const User = await authentication.findOne({email})
  

const userPayload = {
  id: User._id,
  email: User.email
}
//generate passToken 
const passToken = jsonwebtoken.sign(userPayload, process.env.PASSTOKEN, {expiresIn: '30m'})
const websiteURL = `wwwabc.com/${passToken}`

//sendsuccessn email to user
return res.status(200).json({
  message: "successful."
}) 

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

const resetPassword = async(req, res)=>{
  try{
    const {password, email} = req.body

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}




module.exports = {
  registerUser,
    getAllUsers,
    getOneUser,
    updatePassword,
    deleteUser,
    loginUser,
    forgetPassword,
    resetPassword

}
 