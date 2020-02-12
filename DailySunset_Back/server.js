const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const process = require('child_process');
const fs = require ('fs');

var corsOptions = {
  origin: 'http://192.168.1.25',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const uploadDir = __dirname + "/Pictures/";

const app = express();

app.use(cors(corsOptions))
app.use(bodyParser.json());

app.listen(8000, '0.0.0.0', () => {
  console.log('Server started!')
  console.log("Images Directory" + uploadDir);
});

app.route('/api/nbImg').get(
  (req, res) => {
    res.send({
      nbImg: 10
    })
  }
);

app.route('/api/img/:id').get(
    (req, res) => {
	console.log("coucou");
    let id = req.params.id;

    //const id = req.params.id.toString();
	//let path = new RegExp("^[\S]*_id-" + id + "\.jpg$");
	let files = fs.readdirSync(uploadDir);
	console.log(files.length);
	if (id >= files.length) {
	    id = files.length - 1;
	}
    /*files.sort(function(a, b) {
               return fs.statSync(uploadDir + a).mtime.getTime() -
                      fs.statSync(uploadDir + b).mtime.getTime();
           });*/
    res.sendFile(files[id], { root: uploadDir });
  }
);

app.route('/api/img').post(
  (req, res) => {
    res.send(201, req.body)
  }
);

app.route('/api/takePicture').get(
  (req, res) => {
      process.exec(__dirname + '/takePic.sh', (error, stdout, stderr) => {
	  if (error)
	      console.log(stderr);
	  console.log('stdout', stdout);
      });
      res.send("ok");
  }
)
