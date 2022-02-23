const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/studentinfodb";



//insert data
const savedhandler = (req, res) => {
  MongoClient.connect(url, function (err, db) {
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


//---------------------------------------search data------------------------------------//
//find first one
const findfirstdatahandler = (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("studentinfodb");
    var myobj = req.body;
    dbo.collection("studentInformation").findOne({}, function (err, result) {
      if (err) throw err;
      console.log("Got the first one", result);
      db.close();
      res.send(result);
    });
  });
};


//get all data
const getalldatahandler = (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("studentinfodb");
    var myobj = req.body;
    dbo.collection("studentInformation").find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log("Got all result", result);
      db.close();
      res.send(result);
    });
  });
};

//find data by posting data on postman body and retrieve
const searchonedatabypostmanhandler = (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("studentinfodb");
    var myobj = req.body;
    dbo.collection("studentInformation").findOne({ studentEmail: myobj.studentEmail }, {}, function (err, result) {
      if (err) throw err;
      console.log("Got the result", result);
      db.close();
      res.send(result);
    });
  });
};



//data was set from postman
 // var newvalues = { $set: {studentName: myobj.studentName, studentClass: myobj.studentClass,
    //     studentSession: myobj.studentSession, studentEmail: myobj.studentEmail,
    //     fatherName: myobj.fatherName, fatherEmail: myobj.fatherEmail, 
    //     fatherPhone: myobj.fatherPhone, motherName: myobj.motherName,
    //     motherEmail: myobj.motherEmail, motherPhone: myobj.motherPhone,
    //     address: myobj.address} 
    // };

//update data
const updatedatahandler = (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("studentinfodb");
    var myobj = {studentEmail: req.body.studentEmail};
    var updatedOne= {$set: {studentName: req.body.studentName}};
    console.log(myobj);
    dbo.collection("studentInformation").updateOne(myobj, updatedOne, function (err, result) {
      if (err) throw err;
      console.log("Updated", result);
      db.close();
      res.send(result);
    });
  });

};



//delete data

const deletedatahandler = (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("studentinfodb");
    var myquery = { studentEmail: req.body.studentEmail};
    dbo.collection("studentInformation").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
      res.send("1 document deleted");
    });
  });
};




//api handlers
app.post('/save', savedhandler);
app.get('/findone', findfirstdatahandler);
app.get('/getalldata', getalldatahandler);
app.post('/search', searchonedatabypostmanhandler);
app.put('/update', updatedatahandler);
app.delete('/delete', deletedatahandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
