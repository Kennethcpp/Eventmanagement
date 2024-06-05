

//validating register details
const validateReg = async(req, res, next)=>{
  

    const {email, fullname, password} = req.body
    let errors =[]
  if(!email){
    errors.push("please enter email address")
  } else if(!validateEmail(email)){
    errors.push("Invalid email address.")
  }
 
//validating username
  if(!fullname){
    errors.push("please enter your full name")
  }
  
//validating password 
  if(!password){
    errors.push("please enter password")
  } else if(password.length < 6){
    errors.push("password must be 6 character and above")
  }

  //check if user is already registered
 /* 
  const {ExistingUser} = req.body
       if(ExistingUser){
        errors.push("this user already exist")
      }  */
      

      if(errors.length > 0){
        return res.status(400).json({
          message: errors
        })
      } 
      next()
}

 const validateEmail = (email) => {
  const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

  return emailPattern.test(email);
 
};


//validating user login details

const validatelogin = async(req, res, next)=>{
  const {email, password} = req.body
  const {User} = req.body
  let errors =[]
 /* if(!email || !password){
    errors.push("please enter Email and password.")
   } else if(!matchPassword){
    errors.push("Email or password is incorrect")
  }*/
  if(!User){
    errors.push("User Account not Found.")
  }  
  next()

}

const validateOneUser = async(req, res, next)=>{
  const {oneUser } = req.params
  let errors =[]
  if(!oneUser){
    errors.push("Can not get this user at the moment.")
  } 
  next()
  
}

const validateUpdatePassword = async(req, res, next)=>{
  
  const {updatedPassword} = req.body
  let errors =[]
  if(!updatedPassword){
    errors.push("Password update failed please try again..")
  } 
  next()
  
}

const validateDeletedUser = async(req, res, next)=>{

  const { deletedUser} = req.params
  let errors =[]
  if(!deletedUser){
    errors.push("Delete failed please try again..")
  } 
  next()
}

const validateForgotPassword = async(req, res, next)=>{

  const { email } = req.body
  let errors =[]
  if(!User){
    errors.push("User not found")
  }else if(!userPayload){
    errors.push("Access has been denied.")
  }
  next()
  
}


module.exports = {
  validateReg,
  validateEmail,
  validatelogin,
  validateOneUser,
  validateUpdatePassword,
  validateDeletedUser,
  validateForgotPassword
 
}