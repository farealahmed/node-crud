const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


// Database Creation and collection creation
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/studentinfodb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  dbo.createCollection("studentInformation", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});


//insert data
const getsaveposthandler =(req,res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("studentinfodb");
    var myobj = req.body;
    dbo.collection("studentInformation").insertOne(myobj, function (err, result) {
      if (err) throw err;
      console.log("1 document inserted", result);
      db.close();
      res.send(result);
    });
  });
};


//







//api handlers
  app.post('/', getsaveposthandler);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
