var path     = require("path");
var express  = require("express");
var multer   = require("multer");
var Unzipper = require("decompress-zip");

var app = express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './src/uploaded');
  },
  filename: function (req, file, callback) {
    callback(null,file.originalname);
  }
});

app.use(multer({storage : storage}).single('upload_file'));


app.get('/',function(req,res){
      res.sendFile(__dirname + "/upload.html");
});

app.post("/", function(req, res){

    if (req.file){

        var filepath = path.join(req.file.destination, req.file.filename);
        var unzipper = new Unzipper(filepath);
		var filename = function (req, file, callback) {
    callback(null,file.originalname);
  }

        unzipper.on("extract", function () {
            console.log("Finished extracting");
        });

        unzipper.extract({ path: "C://Test/Extract"});
    }

    res.status(204).end();
});


app.listen(3000);