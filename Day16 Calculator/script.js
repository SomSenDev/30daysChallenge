// Calculator object to handle operations
const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
};

// Function to update display
function updateDisplay() {
    const display = document.querySelector('.display input');
    display.value = calculator.displayValue;
}

updateDisplay();

// Function to handle button clicks
function handleButtonClick(buttonValue) {
    if (buttonValue === '.' && calculator.displayValue.includes('.')) {
        return;
    }

    if (calculator.waitingForSecondOperand && calculator.operator) {
        calculator.displayValue = buttonValue;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = calculator.displayValue === '0' ? buttonValue : calculator.displayValue + buttonValue;
    }

    updateDisplay();
}

// Add event listeners to buttons
const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    if(!button.classList.contains('backspace')) {
        button.addEventListener('click', () => {
            const buttonValue = button.textContent;
            handleButtonClick(buttonValue);
        });
    }
   
});

// Function to perform calculations
function performCalculation() {
    if (calculator.operator && calculator.firstOperand !== null) {
        const secondOperand = parseFloat(calculator.displayValue);
        const result = operate(calculator.firstOperand, secondOperand, calculator.operator);
        
        calculator.displayValue = result.toString();
        calculator.firstOperand = result;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }
    updateDisplay();
}

// Math operations
function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b !== 0) {
                return a / b;
            } else {
                return "Error";
            }
        default:
            return "Error";
    }
}

// Add event listener to the equal button
const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', performCalculation);


// Function to handle operator buttons
function handleOperator(operator) {
    const { displayValue } = calculator;
    const inputValue = parseFloat(displayValue);

    if (calculator.operator && calculator.waitingForSecondOperand) {
        calculator.operator = operator;
        return;
    }

    if (calculator.firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
        performCalculation();
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = operator;
}

// Add event listeners to operator buttons
const operatorButtons = document.querySelectorAll('.divide, .mul, .minus, .plus');
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => {
        const operator = operatorButton.textContent;
        handleOperator(operator);
    });
});

// Function to clear the display
function clearDisplay() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    updateDisplay();
}

// Add event listener to the clear button
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearDisplay);

// Function to delete character from the right display
function backspace() {
    if (calculator.displayValue.length > 1) {
        calculator.displayValue = calculator.displayValue.slice(0, -1);
    } else {
        calculator.displayValue = '0';
    }
    updateDisplay();
  
}

// Add event listener to the backspace button
const backspaceButton = document.querySelector('.backspace');

backspaceButton.addEventListener('click', backspace);

// Function to handle decimal point
function handleDecimal() {
    if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
    }
    updateDisplay();
}

// Add event listener to the dot button
const dotButton = document.querySelector('.dot');
dotButton.addEventListener('click', handleDecimal);
