const User = require('../app/models/user.model.js');
const mongoose = require('mongoose');
const multer = require("multer");
const path =  require('path');
const XLSX = require('xlsx');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
   
const upload = multer({
     storage: storage,
     limits: 10000,
     fileFilter: (req, file, cb) =>{
        validateFile(file, cb);
     }
    }).single('data-file');

// validate file 
const validateFile = (file, cb) => {
        allowedFileTypes = /xlsx|xls/;
        const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        if(extension){
          return cb(null, true);
        }else{
            console.log("errors", file.mimetype, path.extname(file.originalname));
          cb("Invalid file type. Only XLSX and XLS file are allowed.");
        }
    }

// validate user id
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

module.exports = (app) => {
    // User Crud 
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
    //////////



    // Create Bulk User via uploading files
    app.post('/upload', (req,  res)=>{
        upload(req, res, (err)=>{
            if(err){
                console.log("Error happened", err, req.file, req.body);
                res.json({"message":"error occured while uploading files"});
            }else{
                const workbook = XLSX.readFile(req.file.path);
                // console.log(workbook);
                const sheet_name_list = workbook.SheetNames;
                const userList = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
                console.log("Sheat Name List",sheet_name_list[0]);
                console.log("Json", workbook.Sheets[sheet_name_list[0]]);
                console.log("Json Sheet", userList);
                User.insertMany(userList, (err)=>{
                    if (err) {
                        res.json({ "message": "error occured while creating user." });
                    } else {
                        console.log("user created");
                        res.json({ "message": "user created" });
                    } 
                });
            }
        })
    }); 
      
}