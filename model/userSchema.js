

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
       require: true,
        unique: true
    },
    fullname:{
        type: String,
        require: true,
        unique: true
    
    },
    password:{
        type: String,
        required: true,
        
    },
})

const authentication = new mongoose.model("authentication", userSchema)

module.exports = authentication