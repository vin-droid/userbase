const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema(
    {   
        name: 
            { 
                type: String, lowercase: true, trim: true
            },
        dob: 
            { 
                type: String 
            },
        mobile: 
            { 
                type: String 
            },
        email: 
            { 
                type: String, lowercase: true, trim: true, index: true  
            },
        address: 
            {
                type: String
            }
    }, 
    {
        timestamps: true,
        strict: false
    });
// userSchema.createIndex({ "email": 1 }, { unique: true })
// userSchema.plugin(uniqueValidator);
userSchema.index( { email: 1, dob: 1, mobile: 1 }, { unique: true } )

module.exports = mongoose.model('User', userSchema);