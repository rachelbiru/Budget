
console.log('app is loading...');

const express = require('express'), PORT = 8080;
const app = express();
const incomes_outcomesMongoDb = require('./income_outcome_MongoDb');
const incomeUrl = '/incomes';
const outcomeUrl = '/outcomes';
app.use(express.json());

const path = require('path');
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

const income_collection = "incomes";
const outcome_collection = "outcomes";


// --- to do code to handle json in body

app.get(incomeUrl, (req,res) => {
    incomes_outcomesMongoDb.getBooks(res,income_collection);
})

app.delete(`${incomeUrl}/:id`, (req, res) => {
    // console.log(req.params.id);
    incomes_outcomesMongoDb.deleteBook(req,res,income_collection);
  })

app.post(incomeUrl, (req,res)=>{
    incomes_outcomesMongoDb.handlePost(req,res,income_collection);
})






app.get(outcomeUrl, (req,res) => {
    incomes_outcomesMongoDb.getBooks(res,outcome_collection);
})

app.delete(`${outcomeUrl}/:id`, (req, res) => {
    // console.log(req.params.id);
    incomes_outcomesMongoDb.deleteBook(req,res,outcome_collection);
  })

app.post(outcomeUrl, (req,res)=>{
    incomes_outcomesMongoDb.handlePost(req,res,outcome_collection);
})




app.listen(PORT, () => {
    console.log(`app is loading on port : ${PORT}`);
})




















// console.log("server is loading ...");
// const express = require("express"),
//   PORT = 8080;
// const app = express();
// app.use(express.json());

// const path = require('path');
// const publicPath = path.join(__dirname, "..", "public");
// app.use(express.static(publicPath));

// const routeHelper = require('./incomes_outcomes');


// function Income(description, amount , id) {
//   this.description = description;
//   this.amount = amount;
//   this.id = id;
// }

// function Outcome(description, amount , id) {
//   this.description = description;
//   this.amount = amount;
//   this.id = id;
// }

// function History(operation,data,type,description,amount){
//    this.operation = operation;
//    this.data = data;
//    this.type = type;
//    this.description = description;
//    this.amount = amount;
// }

// let incomes = [];

// let outcomes = [];

// let arrayHistory = [];

// app.get("/history", (req, res) => {
//    res.send(arrayHistory);
  
// });

// app.post("/history", (req, res) => {
//   const newitem = req.body;
//   arrayHistory.push(newitem);
//   res.status(201).send(newitem);

// });
// console.log(arrayHistory);


// // --- todo handle also outcomes

// app.delete("/incomes/:id",(req,res)=>{
//   routeHelper.handleDelete(req,res,incomes); 
// })

// app.post("/incomes", (req, res) => {
//   routeHelper.handleCreate(req,res,incomes);
// });

// app.get("/incomes", (req, res) => {
//   routeHelper.handleGet(res,incomes);
// });


// app.delete("/outcomes/:id",(req,res)=>{
//   routeHelper.handleDelete(req,res,outcomes);
// })

// app.post("/outcomes", (req, res) => {
//   routeHelper.handleCreate(req,res,outcomes);
// });

// app.get("/outcomes", (req,res) => {
//   routeHelper.handleGet(res,outcomes);
// });

// app.get('*',(req,res)=>{
//   res.status(404).sendfile('./public/faild_404.html');
// }) 


// app.listen(PORT, () => {
//   console.log(`server is listening on port : ${PORT}`);
// });



