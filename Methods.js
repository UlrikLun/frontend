//initiating some const for computers
const computersElement = document.getElementById('computers');
const specs = document.getElementById('chosenComputer');
const img = document.getElementById('computerImg');
const name = document.getElementById('computerName');
const description = document.getElementById('computerDescription');
const price = document.getElementById('computerPrice');
let computers = [];
let currentComputer;

//connecting with the api
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
.then(response => response.json())
.then(data => computers = data)
.then(computers => addComputersToMenu(computers))

const addComputersToMenu = (computers) => {
    computers.forEach(x => addComputerToMenu(x));
}

//adding computers to the list, and displaying the first computer on the site
const addComputerToMenu = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
    specs.innerHTML = computers[0].specs
    img.src = "https://noroff-komputer-store-api.herokuapp.com/assets/images/1.png"
    name.innerHTML = computers[0].title;
    description.innerHTML = computers[0].description;
    price.innerHTML = computers[0].price + " kr";
    currentComputer = computers[0];
    
}

//changing the selected computers with values
const handlerComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    currentComputer = selectedComputer;
    document.getElementById('chosenComputer').textContent = selectedComputer.specs;
    document.getElementById('computerName').textContent = selectedComputer.title;
    document.getElementById('computerImg').src="https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image;
    document.getElementById('computerName').textContent = selectedComputer.title;
    document.getElementById('computerDescription').textContent = selectedComputer.description;
    document.getElementById('computerPrice').textContent = selectedComputer.price + " kr";
    currentComputer = selectedComputer;

}
//eventlistener for computers
computersElement.addEventListener("change", handlerComputerChange);

function bank(balance, loan, pay){
    this.balance = balance;
    this.loan    = loan;
    this.pay     = pay;
}
//creating instance of the users bank
const myBank = new bank(0, 0, 0);

//function for the work button, adds 100kr to the pay balance
function work(){
    myBank.pay += 100;
    updateFields();  
}

//function for buying a computer, if the user have the funds
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

//general method for updating the user interface when values change
function updateFields(){
    if(isNaN(myBank.loan)){myBank.loan = 0;}
    document.getElementById('loanBalanceFinder').textContent = myBank.loan + " kr";
    document.getElementById('payBalanceFinder').textContent = myBank.pay + " kr";
    document.getElementById('balanceFinder').textContent = myBank.balance + " kr";
    document.getElementById('computerBought').style.visibility = 'hidden';
    document.getElementById('notEnoughMoney').style.visibility = 'hidden';

}

//updating visibility for loan field
function updateVisibility(){
    if(myBank.loan == 0){
        document.getElementById('hasLoan').style.visibility = 'hidden';
    }else{
        document.getElementById('hasLoan').style.visibility = 'visible';
    }
}

//function for the pay all loan button, adds to balance if loan is less than the pay balance
function payAllLoan(){
    if(myBank.pay >= myBank.loan){
        myBank.balance += (myBank.pay - myBank.loan);
        myBank.loan = 0;
        myBank.pay = 0;
        document.getElementById('payLoanDown').style.visibility = 'hidden';

    }else{
        myBank.loan -= myBank.pay;
        myBank.pay = 0;
    }
    updateVisibility();
    updateFields();
}

//function for the work button, using 10% of pay balance to pay loan, rest goes to balance
function getPayCheck(){
    if(myBank.loan < (myBank.pay/10)){
        myBank.balance += (myBank.pay - myBank.loan);
        myBank.loan = 0;
        myBank.pay = 0;
        document.getElementById('payLoanDown').style.visibility = 'hidden';
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

//function to get a loan, if the user is allowed
function getLoan(){
    let newLoan = prompt("Enter amount you want to loan, cannot be more than 2x of your balance. You can also only have one loan at the time");
    if(myBank.loan == 0 && newLoan <= (myBank.balance*2) && !isNaN(newLoan)){
    myBank.loan = parseInt(newLoan);
    document.getElementById('payLoanDown').style.visibility = 'visible';
    if(newLoan > 0){
        myBank.balance += parseInt(newLoan);
    }
    document.getElementById('loanTooHigh').style.visibility = 'hidden';
    }else{
        document.getElementById('loanTooHigh').style.visibility = 'visible';
    }

    updateFields();
    updateVisibility();
    
}

//setting some starting visibility and values for the site
document.getElementById('balanceFinder').textContent = myBank.balance;
document.getElementById('loanBalanceFinder').textContent = myBank.loan;
document.getElementById('loanTooHigh').style.visibility = 'hidden';
document.getElementById('notEnoughMoney').style.visibility = 'hidden';
document.getElementById('computerBought').style.visibility = 'hidden';
document.getElementById('payLoanDown').style.visibility = 'hidden';



updateFields();
updateVisibility();
