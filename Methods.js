
const computersElement = document.getElementById('computers');
const specs = document.getElementById('chosenComputer');
const img = document.getElementById('computerImg');
const name = document.getElementById('computerName');
const description = document.getElementById('computerDescription');
const price = document.getElementById('computerPrice');
let computers = [];
let currentComputer;


fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
.then(response => response.json())
.then(data => computers = data)
.then(computers => addComputersToMenu(computers))

const addComputersToMenu = (computers) => {
    computers.forEach(x => addComputerToMenu(x));
}

const addComputerToMenu = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
    specs.innerHTML = computers[0].specs
    img.src = "https://noroff-komputer-store-api.herokuapp.com/assets/images/1.png"
    name.innerHTML = computers[0].title;
    description.innerHTML = computers[0].description;
    price.innerHTML = computers[0].price;
    currentComputer = computers[0];
    
}

const handlerComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    currentComputer = selectedComputer;
    document.getElementById('chosenComputer').textContent = selectedComputer.specs;
    document.getElementById('computerName').textContent = selectedComputer.title;
    document.getElementById('computerImg').src="https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image;
    document.getElementById('computerName').textContent = selectedComputer.title;
    document.getElementById('computerDescription').textContent = selectedComputer.description;
    document.getElementById('computerPrice').textContent = selectedComputer.price;
    currentComputer = selectedComputer;

}





computersElement.addEventListener("change", handlerComputerChange);




function bank(balance, loan, pay){
    this.balance = balance;
    this.loan    = loan;
    this.pay     = pay;
}

const myBank = new bank(0, 0, 0);


function work(){
    console.log(currentComputer)
    myBank.pay += 100;
    console.log(myBank.pay)
    updateFields();  
}

function buyComputer(){
        updateFields();
    if(myBank.balance >= currentComputer.price){
        myBank.balance -= currentComputer.price;
        updateFields();
        document.getElementById('computerBought').style.visibility = 'visible';
    }else{
        document.getElementById('notEnoughMoney').style.visibility = 'visible';
    }

}

function updateFields(){
    document.getElementById('loanBalanceFinder').textContent = myBank.loan;
    document.getElementById('payBalanceFinder').textContent = myBank.pay;
    document.getElementById('balanceFinder').textContent = myBank.balance;
    document.getElementById('computerBought').style.visibility = 'hidden';
    document.getElementById('notEnoughMoney').style.visibility = 'hidden';

}

function updateVisibility(){
    if(myBank.loan == 0){
        document.getElementById('hasLoan').style.visibility = 'hidden';
    }else{
        document.getElementById('hasLoan').style.visibility = 'visible';
    }
}

function payAllLoan(){
    if(myBank.pay >= myBank.loan){
        myBank.balance += (myBank.pay - myBank.loan);
        myBank.loan = 0;
        myBank.pay = 0;
    }else{
        myBank.loan -= myBank.pay;
        myBank.pay = 0;
    }
    updateVisibility();
    updateFields();
}

function getPayCheck(){

    if(myBank.loan < (myBank.pay/10)){
        myBank.balance += (myBank.pay - myBank.loan);
        myBank.loan = 0;
        myBank.pay = 0;
        document.getElementById('loanTooHigh').style.visibility = 'hidden';

    }else{
        myBank.loan = myBank.loan - (myBank.pay/10);
        myBank.pay -= myBank.pay/10;
        myBank.balance += myBank.pay;
        myBank.pay = 0;
    }
    
    updateFields();
    updateVisibility();

    
}

function getLoan(){
    let newLoan = document.getElementById('loanAmount').value;

    if(myBank.loan == 0 && newLoan <= (myBank.balance*2)){
    myBank.loan = parseInt(newLoan);
    myBank.balance += parseInt(newLoan);
    document.getElementById('loanTooHigh').style.visibility = 'hidden';
    }else{
        document.getElementById('loanTooHigh').style.visibility = 'visible';
    }

    updateFields();
    updateVisibility();
    
}

//Interaction with the html page
document.getElementById('balanceFinder').textContent = myBank.balance;
document.getElementById('loanBalanceFinder').textContent = myBank.loan;
document.getElementById('loanTooHigh').style.visibility = 'hidden';
document.getElementById('notEnoughMoney').style.visibility = 'hidden';
document.getElementById('computerBought').style.visibility = 'hidden';



updateFields();
updateVisibility();

console.log(myBank);

