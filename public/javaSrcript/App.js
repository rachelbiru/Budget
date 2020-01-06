
let sumIncome = 0;
let sumOutcome = 0;
let totalIncomeServer = 0;
let totalOutcomeServer = 0;
let showBalance = 0;
let resultPrecent = 0;
let incomes;
let outcomes;
let percent_value_list;
let arrayPrecentValues = [];
let allValusExpensess;

getArray_incomes_or_outcomes('incomes');
getArray_incomes_or_outcomes('outcomes');

let input_description = document.getElementById('inputDescription');
let input_Sum_Money = document.getElementById('inputSumOfMoney');
let balance = document.getElementById('Showbalance');
let showPrecent = document.getElementById("showPrecent");
let listExpenses = document.getElementsByClassName("ListExpenses");
let choicePluseOrMinus = document.getElementById('select');

function clickToEnter_incomes_or_outcomes() {
    if ((input_description.value !== "") && (input_Sum_Money.value !== "") && (input_Sum_Money.value > 0)) {
        if (document.getElementById("select").value == "+") {
            createArrayElement_incomes_or_outcomes("incomes");
        }
        else {
            createArrayElement_incomes_or_outcomes("outcomes")
        }
    }
    else{
        showErrorAlertMessage();
    }
}

function createArrayElement_incomes_or_outcomes(url) {
    const description = document.getElementById('inputDescription').value;
    const amount = Number(document.getElementById('inputSumOfMoney').value);
    axios.post(`/${url}`, {
        description: description,
        amount: amount
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 201) {
                if (url == 'incomes') {
                    document.getElementById('showIncomes_valus').innerHTML = "";
                    getArray_incomes_or_outcomes('incomes');
                    createArrayhistory("post","income",description);
                }
                else {
                    document.getElementById('showOutcomes_valus').innerHTML = "";
                    getArray_incomes_or_outcomes('outcomes');
                    createArrayhistory("post","outcome",description);
                }
            }
            else {
                console.log("Error");
            }
        })
        .catch(function (error) {
            console.log(error);
            showErrorAlertMessage();
        });
}

function deleteArrayById_incomes_or_outcomes(url, id, ThisObject, amount,description) {
    axios.delete(`/${url}/${id}`)
        .then(function (response) {
            if (response.status == 200) {
                const parent = ThisObject.parentElement;
                parent.removeChild(ThisObject);

                if (url == 'incomes') {
                    Compute_Total_income("minus", amount);
                    createArrayhistory("delete","income",description);
                } else {
                    Compute_Total_outcome("minus", amount);
                    createArrayhistory("delete","outcome",description);
    
                }
                Calculates_seperate_percentage();
            }

            else {
                console.log(`got error code from server : ${response.status}`);
            };
        })
        .catch(function (error) {
            console.log(error);
            showErrorAlertMessage();
        });
}

function showArray_incomes_or_outcomes(url, array, idDiv) {
    const parent = document.getElementById(`${idDiv}`);
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const elementP = document.createElement('p');
        parent.appendChild(elementP);

        let elementSpanD = document.createElement('span');
        elementP.appendChild(elementSpanD);
        elementSpanD.innerHTML = element.description;
        elementSpanD.classList.add('spanDescription');

        let elementSpanA = document.createElement('span');
        elementP.appendChild(elementSpanA);
        elementSpanA.innerHTML = element.amount;
        elementSpanA.classList.add('spanAmount')

        if (idDiv === 'showOutcomes_valus') {
            percent_value_list = document.createElement('span');
            elementP.appendChild(percent_value_list);
            percent_value_list.classList.add('showPrec');
            
            elementSpanA.classList.add('ListExpenses')
            allValusExpensess = document.getElementsByClassName('ListExpenses');
        }

        let elementSpanFA = document.createElement('span');
        elementP.appendChild(elementSpanFA);
        elementSpanFA.innerHTML = `<i  class="far fa-times-circle"></i>`
        if(idDiv === 'showOutcomes_valus'){
            elementSpanFA.style.color = "rgb(249, 53, 58)";
        }else{
            elementSpanFA.style.color = "rgb(51, 169, 164)";
        }

        elementSpanFA.onclick = function () {
            deleteArrayById_incomes_or_outcomes(url, element._id, elementP, element.amount,element.description);
        }
    }
}

function getArray_incomes_or_outcomes(url) {
    axios.get(`/${url}`)
        .then(function (response) {
            if(response.status == 200){
                if (url == 'incomes') {
                    incomes = response.data;
                    calculateIncomeServer(incomes);
                    showArray_incomes_or_outcomes('incomes', incomes, "showIncomes_valus");
                }
                else {
                    outcomes = response.data;
                    calculateOucomeServer(outcomes);
                    showArray_incomes_or_outcomes('outcomes', outcomes, "showOutcomes_valus");
                }
                Calculates_seperate_percentage();
            }
            else{
                console.log('errorr');
            }

        })
        .catch(function (error) {
            console.log(error);
        showErrorAlertMessage();

        })
}

function showErrorAlertMessage(){
    document.getElementById('alertMSG').style.display = "block";
}

function computeBalance(income, outcome) {
    showBalance = (income - outcome);
    if ((showBalance > 0) || (showBalance == 0)) {
        balance.innerHTML = (`+${parseFloat(showBalance).toFixed(2)}`)
    } else {
        balance.innerHTML = (`${parseFloat(showBalance).toFixed(2)}`)
    }
}

function Calculates_seperate_percentage() {
    allValusExpensess = document.getElementsByClassName('ListExpenses');
    let allPrecSpan = document.getElementsByClassName('showPrec');
    for (let i = 0; i < allValusExpensess.length; i++) {
        const element = Number(allValusExpensess[i].innerText);
        let resultPrecent = Math.floor((element / totalIncomeServer) * 100);

        if((resultPrecent == Infinity) || (isNaN(resultPrecent))){
            allPrecSpan[i].innerHTML = `${0}%`;
        }else{
            allPrecSpan[i].innerHTML = `${resultPrecent}%`;
        }
    }
}

function Calculates_percentage(num, per) {
    resultPrecent = Math.floor((num / per) * 100);
    if ((resultPrecent == Infinity) || (isNaN(resultPrecent))) {
        resultPrecent = 0;
        showPrecent.innerHTML = `${0}%`;

    } else if (resultPrecent < 0) {
        resultPrecent = resultPrecent * -1;
        showPrecent.innerText = (`${resultPrecent}%`);
    } else {
        showPrecent.innerText = (`${resultPrecent}%`);
        return resultPrecent;
    }
}

function calculateIncomeServer(incomes_array) {
    totalIncomeServer = 0;
    for (let i = 0; i < incomes_array.length; i++) {
        totalIncomeServer += incomes_array[i].amount;
    }
    document.getElementById('spanShowINCOME').innerHTML = (`+${parseFloat(totalIncomeServer).toFixed(2)}`);
    computeBalance(totalIncomeServer, totalOutcomeServer);
    Calculates_percentage(totalOutcomeServer, totalIncomeServer);
}

function calculateOucomeServer(outcomes_server) {
    totalOutcomeServer = 0;
    for (let i = 0; i < outcomes_server.length; i++) {
        totalOutcomeServer += outcomes_server[i].amount;
    }
    document.getElementById('spanShowExpenses').innerHTML = (`-${parseFloat(totalOutcomeServer).toFixed(2)}`);
    computeBalance(totalIncomeServer, totalOutcomeServer);
    Calculates_percentage(totalOutcomeServer, totalIncomeServer);
}

function Compute_Total_income(delete_create, amount) {
    if (delete_create === 'add') {
        sumIncome = (totalIncomeServer += amount);
        document.getElementById('spanShowINCOME').innerHTML = (`+${parseFloat(sumIncome).toFixed(2)}`);

    } else {
        sumIncome = (totalIncomeServer -= amount);
        console.log(sumIncome);
        document.getElementById('spanShowINCOME').innerHTML = (`+${parseFloat(sumIncome).toFixed(2)}`);
    }
    computeBalance(sumIncome, totalOutcomeServer);
    Calculates_percentage(totalOutcomeServer, sumIncome);
}

function Compute_Total_outcome(delete_create, amount) {
    if (delete_create === 'add') {
        sumOutcome = (totalOutcomeServer += amount);
        document.getElementById('spanShowExpenses').innerHTML = (`-${parseFloat(sumOutcome).toFixed(2)}`);

    } else {
        sumOutcome = (totalOutcomeServer -= amount);
        document.getElementById('spanShowExpenses').innerHTML = (`-${parseFloat(sumOutcome).toFixed(2)}`);
    }
    computeBalance(totalIncomeServer, sumOutcome);
    Calculates_percentage(sumOutcome, totalIncomeServer);
}

function Changes_border_color_select() {
    if (choicePluseOrMinus.value == "-") {
        choicePluseOrMinus.style.outline = "2px solid rgb(249, 53, 58)";
        document.getElementById('checIcon').style.color = "rgb(249, 53, 58";
    }
    else {
        choicePluseOrMinus.style.outline = "2px solid rgb(51, 169, 164)";
        document.getElementById('checIcon').style.color = "rgb(51, 169, 164)";
    }
}

function Changes_border_color_inputD() {
    if (choicePluseOrMinus.value == "-") {
        choicePluseOrMinus.style.outline = "";
        input_description.style.outline = "2px solid rgb(249, 53, 58)";
    }
    else {
        choicePluseOrMinus.style.outline = "";
        input_description.style.outline = "2px solid rgb(51, 169, 164)";
    }
}

function Changes_border_color_inputM() {
    if (choicePluseOrMinus.value == "-") {
        input_description.style.outline = "";
        input_Sum_Money.style.outline = "2px solid rgb(249, 53, 58)";
    }
    else {
        input_description.style.outline = "";
        input_Sum_Money.style.outline = "2px solid rgb(51, 169, 164)";
    }
}

function createArrayhistory(operation,type,description) {
    data = new Date;
         let date =  data.toLocaleString('en-GB', { timeZone: 'UTC' })
    axios.post("/history", {
      operation : operation,
      data : date,
      type : type,
      description : description
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 201) {        
            }else {
                console.log("Error");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

let input = document.getElementById("inputSumOfMoney");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('checIcon').onclick();
    }
});

let date = new Date();
let month = date.getMonth();
let month1;
switch (month) {
    case 0:
        month1 = "January";
        break;
    case 1:
        month1 = "February";
        break;
    case 2:
        month1 = "March";
        break;
    case 3:
        month1 = "April";
        break;
    case 4:
        month1 = "May";
        break;
    case 5:
        month1 = "June";
        break;
    case 6:
        month1 = "July";
        break;
    case 7:
        month1 = "August";
        break;
    case 8:
        month1 = "September";
        break;
    case 9:
        month1 = "October";
        break;
    case 10:
        month1 = "November";
        break;
    case 11:
        month1 = "December";
        break;
}

let year = date.getUTCFullYear();
document.getElementById('ShowMonthAndYaer').innerHTML = `Available Budget in <span> ${month1} ${year}: </span>`;














