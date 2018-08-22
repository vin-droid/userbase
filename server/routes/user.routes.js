const User = require('../app/models/user.model.js');
const mongoose = require('mongoose');

module.exports = (app) => {
    // Create User
    app.post('/users', (req, res) => {
        const user =  new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        });
        user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(
                {
                    message: "User created",
                    createdUser: user
                }
            );
        })
        .catch(err => 
            {
                console.log(err);
                res.status(500).json(err);
            }
        );
    });

    // All Users
    app.get('/users', (req, res) => {
        User
        .find()
        .exec()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    });

    // Find User by Id
    app.get('/user/:userId', (req, res) => {
        validateValidUserId(req, res);
        User
            .findById(req.params.userId)
            .exec()
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });;
    });

    // Update User
    app.patch('/user/:userId',(req, res)=>{
        validateValidUserId(req, res);
        User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    // Delete User
    app.delete('/user/:userId', (req, res)=>{
        validateValidUserId(req, res);
        User.deleteOne({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    });

    const validateValidUserId = (req, res) =>{
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            res.status(422).json(
                {
                    "errors": 
                    {
                        "userId": 
                        {
                            "message": `${req.params.userId} is not a valid Id.`
                        }

                    },
                    "_message": "User validation failed",
                    "message": `User validation failed: userId: Error, expected userId to be valid. Value: ${req.params.userId}`,
                    "name": "ValidationError"
                });  
        }
    }
}