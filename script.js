const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equal');
const deleteButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.clear');
const prevDisplay = document.querySelector('.prev-display');
const currDisplay = document.querySelector('.curr-display');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    currDisplay.innerText = currentOperand;
    if (operation != null) {
        prevDisplay.innerText = `${previousOperand} ${operation}`;
    } else {
        prevDisplay.innerText = '';
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
    });
});

equalsButton.addEventListener('click', button => {
    compute();
});

allClearButton.addEventListener('click', button => {
    clear();
});

deleteButton.addEventListener('click', button => {
    deleteNumber();
});