const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const my_db = "my-budget";
const url = "mongodb://localhost:127.0.0.1/";


function handleGet(res, collection) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var dbo = db.db(my_db);
    dbo.collection(collection).find({}).toArray(function (err, incomes) {
      if (err) {

        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.send(incomes);
      db.close();

    });
  });
}

function handleDelete(req, res, collection) {
  const id = req.params.id;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    // ---todo !! send status code 404 in case id is not found
    var dbo = db.db(my_db);
    dbo.collection(collection).findOneAndDelete({ _id: new mongo.ObjectId(id)}, function (err, document) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      if(document.value){
        res.sendStatus(200);
      }
      else{
        res.sendStatus(400);
      }
      console.log("1 document deleted");
      console.log(document);
    });
  });
}

function handlePost(req, res, collection) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var dbo = db.db(my_db);
    // --- expecting : name , pages , isNew
    var bookObj = req.body;
    dbo.collection(collection).insertOne(bookObj, function (err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      console.log(result);
      // --- todo : might send also the created object
      res.sendStatus(201);
      db.close();
    });
  });
}

module.exports.handleGet = handleGet;
module.exports.handleDelete = handleDelete;
module.exports.handlePost = handlePost;
