const express = require("express");
const http = require('http');
const path = require('path');
const multer  = require('multer');
const fs = require('fs');
const app = express();

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage}).single('file');

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "files")));
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        
    console.log(req.file.filename);    
    res.json({url: "./files/" + req.file.filename});    
  })
});

app.get("/filelist", (req, res) => {
  const paths = fs.readdirSync(path.join(__dirname, 'files'));
  res.json(paths);    
})

const server = http.createServer(app);
server.listen(5600, () => {
  console.log("- server running");
});