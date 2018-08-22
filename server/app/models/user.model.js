const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema(
    {   
        first_name: 
            { 
                type: String, lowercase: true, trim: true, required: true
            },
        last_name: 
            { 
                type: String, lowercase: true 
            },
        email: 
            { 
                type: String, lowercase: true, trim: true, unique: true, index: true  
            },
        address: 
            {
                type: String
            }
    }, 
    {
        timestamps: true
    });
// userSchema.createIndex({ "email": 1 }, { unique: true })
// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);