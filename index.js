const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/studentinfodb";



//insert data
const savehandler = (req, res) => {
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
const datatosearchonehandler = (req, res) => {
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



//update data

const updatedatahandler = (req, res) => {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("studentinfodb");
    var myobj = req.body;
    // var newvalues = { $set: {studentName: myobj.studentName, studentClass: myobj.studentClass,
    //     studentSession: myobj.studentSession, studentEmail: myobj.studentEmail,
    //     fatherName: myobj.fatherName, fatherEmail: myobj.fatherEmail, 
    //     fatherPhone: myobj.fatherPhone, motherName: myobj.motherName,
    //     motherEmail: myobj.motherEmail, motherPhone: myobj.motherPhone,
    //     address: myobj.address} 
    // };
    console.log(myobj);
    dbo.collection("studentInformation").updateOne({ _id: new ObjectId(myobj._id) }, { $set: { studentEmail: "fat@gmail.com" } }, function (err, result) {
      if (err) throw err;
      console.log("Updated", result);
      db.close();
      res.send(result);
    });
  });

};



//delete data

const getposthandler = (req, res) => {
  deletedData = "";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("studentinfodb");
    var myobj = req.body;
    dbo.collection("studentInformation").findOne({ studentEmail: myobj.studentEmail }, {}, function (err, result) {
      if (err) throw err;
      console.log("Got all result", result);
      db.close();
      res.send(result);
      deletedData = result;
    });
  });
};

const getdeletehandler = (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("studentinfodb");
    var myquery = { studentEmail: deletedData.studentEmail };
    dbo.collection("studentInformation").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
      res.send("1 document deleted");
    });
  });
};




//api handlers
app.post('/save', savehandler);
app.get('/findone', findfirstdatahandler);
app.get('/getalldata', getalldatahandler);
app.post('/search', datatosearchonehandler);
app.put('/update', updatedatahandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
