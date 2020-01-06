const fs = require('fs');
const fileName = 'incomes_outcomes_history.txt';
let incomes_outcomes_history = [];

function get() {
    const history_Array_As_Json = fs.readFileSync(fileName);
    incomes_outcomes_history = JSON.parse(history_Array_As_Json);
    return incomes_outcomes_history;
}

function getAllHistoryFromFile(req,res) {
    try {
       get();
        res.send(incomes_outcomes_history).status(200);

    } catch{
        console.log('got exception');
        incomes_outcomes_history = [];
    }
}

function addHistory(req, res) {
    get();
    const newitem = req.body;
    incomes_outcomes_history.push(newitem);
    incomes_outcomes_history = JSON.stringify(incomes_outcomes_history);
    fs.writeFileSync(fileName, `${incomes_outcomes_history}\n`);
    res.status(201).send(newitem);
}

module.exports.getAllHistoryFromFile = getAllHistoryFromFile;
module.exports.addHistory = addHistory;

