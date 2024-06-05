
const express = require("express")

const {registerUser,getAllUsers, getOneUser,updatePassword,deleteUser,
    loginUser,forgetPassword } = require("../control/regcontrol")
const {validateReg,validateOneUser, 
    validateUpdatePassword, validateDeletedUser, validatelogin, validateForgotPassword} = require("../routes/middleware")





const app = express.Router()
 
    app.post("/register", validateReg, registerUser)

    app.get("/alluser", getAllUsers)

    app.get("/oneuser/:id", validateOneUser, getOneUser)

    app.patch("/update-user-password/:id", validateUpdatePassword, updatePassword)

    app.delete("/delete-user/:id", validateDeletedUser, deleteUser)

    app.post("/login", validatelogin, loginUser)

    app.post("/forget-password", validateForgotPassword, forgetPassword)



 



 
module.exports = app