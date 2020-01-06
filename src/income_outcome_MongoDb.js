const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const my_db = "my-budget";



function getBooks(res,collection) {
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
            //  array = incomes;
            // console.log(array);
          
            res.send(incomes);
            db.close();

        });
    });
}

function deleteBook(req,res,collection) {  
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
    }

    // ---todo !! send status code 404 in case id is not found
   

    var dbo = db.db(my_db);
    const id = req.params.id;

    dbo.collection(collection).deleteOne({ _id: new mongo.ObjectId(id)}, function(err, status) {
      if (err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log("1 document deleted");

      console.log(status);
      res.sendStatus(200);
      db.close();
      
    });
  });
}

function handlePost(req, res,collection) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      var dbo = db.db(my_db);
      // --- expecting : name , pages , isNew
      var bookObj = req.body;
      dbo.collection(collection).insertOne(bookObj, function(err, result) {
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





//   function handleUpdate(req, res){
//     MongoClient.connect(url, function(err, db) {
//       if (err)  {
//         res.sendStatus(500);
//         return;
//       };
  
//       // --- todo check first if document exist if not send 404 and return  
  
//       var dbo = db.db(my_db);
//       var myquery = { _id: new mongo.ObjectID(req.params.id)  };
//       var bookObjToUpdate = req.body;
//       var newvalues = { $set:  bookObjToUpdate};
//       dbo.collection(income_collection).updateOne(myquery, newvalues, function(err, result) {
//         if (err) {
//           res.sendStatus(500);
//           return;
//         };
//         console.log(result);
//         res.sendStatus(200);
//         db.close();
//       });
//     });
    
//   }

 module.exports.getBooks = getBooks;
 module.exports.deleteBook = deleteBook;
 module.exports.handlePost = handlePost;
// module.exports.handleUpdate = handleUpdate;
