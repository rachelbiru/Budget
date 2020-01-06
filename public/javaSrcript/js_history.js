let arrayHistory;
getArrayHistory();

function showArrayhistory(array) {
    const parent = document.getElementById('table-striped');
    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        let elementTR = document.createElement('tr');
        parent.appendChild(elementTR);

        let elementTdOper = document.createElement('td');
        elementTR.appendChild(elementTdOper);
        elementTdOper.innerHTML = element.operation;
        
        let elementTdData = document.createElement('td');
        elementTR.appendChild(elementTdData);
        elementTdData.innerHTML = element.data

        let elementTdType = document.createElement('td');
        elementTR.appendChild(elementTdType);
        elementTdType.innerHTML = element.type;

        let elementTdDescription = document.createElement('td');
        elementTR.appendChild(elementTdDescription);
        elementTdDescription.innerHTML = element.description;
        
        if(elementTdType.innerText === "income"){
            elementTdOper.classList.add('color_for_income');
            elementTdData.classList.add('color_for_income');
            elementTdType.classList.add('color_for_income');
            elementTdDescription.classList.add('color_for_income');
        }
        else{
            elementTdOper.classList.add('color_for_outcome');
            elementTdData.classList.add('color_for_outcome');
            elementTdType.classList.add('color_for_outcome');
            elementTdDescription.classList.add('color_for_outcome');
        }


    }
}

function getArrayHistory() {
    axios.get('/history')
        .then(function (response) {
            if (response.status == 200) {
                arrayHistory = response.data;
                console.log(arrayHistory);
                showArrayhistory(arrayHistory);         
            }
            else {
                console.log('errorr');
            }
        })
        .catch(function (error) {
            console.log(error);

        })
}

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