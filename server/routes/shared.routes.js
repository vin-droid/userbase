module.exports = (app) =>{
    app.get('/', function(req,res){
        res.json({"message": "Home Page"});
    })
}