
getIncomes();

function showIncomes() {
    for (let index = 0; index < incomes.length; index++) {
        const income = incomes[index];
        let elementP = document.createElement('p');
        document.getElementById('showIncomes_valus').appendChild(elementP);
        elementP.innerHTML = `${income.description} , ${income.amount}, ${income._id} `;
        elementP.onclick = function () {
            deleteIncomeById(income._id, this);
        }
    
    }
}

function getIncomes() {
    axios.get('/incomes')
        .then(function (response) {
            // handle success
            // -- todo check status code is 201.
            // -- if yes -> show incomes  , else issue error.
            incomes = response.data;
            showIncomes();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

function deleteIncomeById(id, ThisObject) {
    axios.delete(`/incomes/${id}`)
        .then(function (response) {
            // -- todo check status code is 201.
            // -- if yes -> delete from dom , else issue error.
            if (response.status == 200) {
                // --- remove from dom
                const parent = ThisObject.parentElement;
                parent.removeChild(ThisObject);

                
                //  getIncomes();
                // Compute_Total(incomes,'spanShowINCOME',sumIncome);
                // sumIncome -= amount;
                // document.getElementById("spanShowINCOME").innerText = sumIncome;
            }
            else {
                console.log(`got error code from server : ${response.status}`);
            }
            // console.log(response.data);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

function clickhere(){
    createIncome();
}

function createIncome() {
    const description = document.getElementById('inputDescription').value;
    const amount = Number(document.getElementById('inputSumOfMoney').value);
    axios.post('/incomes', {
        description: description,
        amount: amount
    })
        .then(function (response) {

            // -- todo check status code is 201.
            // -- if yes -> add to dom , else issue error.
            console.log(response);
            if (response.status == 201) {
                document.getElementById('showIncomes_valus').innerHTML = "";
                // Compute_Total(incomes, 'spanShowINCOME','sumIncome');
                getIncomes();
            }
            else {

            }
        })
        .catch(function (error) {
            console.log(error);
        });
}











