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

module.exports = (app, db) => {
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
            // var dbo = mongoose.connection;
            // console.log("dbo=============>",dbo);
            // dbo.collection('users').find({}).toArray((err, result)=>{
            //     if (err){
            //        res.status(500).json(err); 
            //    }else{
            //     res.json(result);
            //    }
            // });
            console.log("fetching user list");
            User
            .find()
            .skip(parseInt(req.query.offset))
            .limit(parseInt(req.query.limit))
            .lean()
            .exec()
            .then(result => {
                // console.log(result);
                res.json({total_count: result.length, users: result });
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
                console.log("file uploaded");
                console.log("file dATA", req.file, req.body);
                const workbook = XLSX.readFile(req.file.path);
                const sheet_name_list = workbook.SheetNames;
                const userList = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
                var remainder = userList.length % 1000;
                var is_error = false;
                console.log("remainder", remainder);
                console.log("usserlist  length", userList.length);

                while (userList.length >= remainder){
                    User.insertMany(userList.splice(0, 1000))
                    .then(result => {
                        is_error = false;
                    })
                    .catch(err => {
                        is_error = true;
                        res.status(500).json(err);
                    });
                    console.log(1000, "user inserted=============and userlist length", userList.length  );
                }

                if (!is_error){
                    res.status(201).json(
                        {
                            message: "User created"
                        }
                    );
                }
            }
        })
    }); 
    
    function renameKeys(obj, newKeys) {
        const keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
        });
        return Object.assign({}, ...keyValues);
    }
}