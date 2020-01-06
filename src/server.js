
console.log('app is loading...');

const express = require('express'), PORT = 8080;
const app = express();
const incomes_outcomesMongoDb = require('./income_outcome_MongoDb');
const history_module_readFile = require('./history_module_readFile');
const incomeUrl = '/incomes';
const outcomeUrl = '/outcomes';
app.use(express.json());

const path = require('path');
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

const income_collection = "incomes";
const outcome_collection = "outcomes";



app.get("/history", (req, res) => {
    history_module_readFile.getAllHistoryFromFile(req,res);
});
 
 app.post("/history", (req, res) => {
    history_module_readFile.addHistory(req,res);
 });

 
app.get(incomeUrl, (req,res) => {
    incomes_outcomesMongoDb.handleGet(res,income_collection);
})

app.delete(`${incomeUrl}/:id`, (req, res) => {
    incomes_outcomesMongoDb.handleDelete(req,res,income_collection);
  })

app.post(incomeUrl, (req,res)=>{
    incomes_outcomesMongoDb.handlePost(req,res,income_collection);
})



app.get(outcomeUrl, (req,res) => {
    incomes_outcomesMongoDb.handleGet(res,outcome_collection);
})

app.delete(`${outcomeUrl}/:id`, (req, res) => {
    incomes_outcomesMongoDb.handleDelete(req,res,outcome_collection);
  })

app.post(outcomeUrl, (req,res)=>{
    incomes_outcomesMongoDb.handlePost(req,res,outcome_collection);
})


app.listen(PORT, () => {
    console.log(`app is loading on port : ${PORT}`);
})