const fs = require('fs');
const path = require("path");
const multer = require("multer");

const exphbs  = require('express-handlebars');


const express = require("express");

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
let data = JSON.parse(fs.readFileSync('public/data/data.json', 'utf8'));

app.get('/', function (req, res) {
    res.render('index',{jujutsu:data});
    
  });
  app.get('/add', function (req, res) {
    res.render('add');
    
  });
  const upload = multer({
    dest: "./public/data/images"
  });
  
  app.post("/upload",
    upload.single("file"),
    (req, res) => {
      let tempPath = req.file.path;
      console.log(tempPath)
  
      if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, tempPath+".png", err => {
          if (err) return handleError(err, res);
  
         
        });
      }else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
  
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }
      const newcharacter = { name: req.body.name,characteristics: req.body.characteristics, photo: "data/"+path.basename(tempPath)+ext };
    gamers.push(acter)
    let json=JSON.stringify(jujutsu)   // on ecrit les modifications dans le fichier JSON
    fs.writeFile('public/data/users.json', json, 'utf8', function(err) {
      if (err) throw err;
      res.redirect('/');
    });
  } else {
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);
    });
    res.status(404).send('error');
} 

    }
  );

  const port = process.env.PORT || 9005
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
  


