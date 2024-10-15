const inputField = document.getElementById("calculator-input");
let currentInput = "0";
let lastValue = null;
let currentOperator = null;
let decimalAdded = false;


function updateInputField(value) {
    inputField.value = value;
}

function clearAll() {
    currentInput = "0";
    lastValue = null;
    currentOperator = null;
    decimalAdded = false;
    updateInputField(currentInput);
}

function appendToInput(value) {
    if (currentInput === "Ошибка") {
        currentInput = value;
    } else {
        if (value === "." && decimalAdded) return;
        if (value === ".") decimalAdded = true;

        if (currentInput === "0" && value !== ".") {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }
    updateInputField(currentInput);
}

function handleOperator(operator) {
    if (lastValue === null) {
        lastValue = parseFloat(currentInput);
    } else if (currentOperator) {
        calculate();
    }

    currentOperator = operator;
    currentInput = "0";
    decimalAdded = false;
}

function calculate() {
    if (currentOperator && lastValue !== null) {
        let currentNumber = parseFloat(currentInput);

        if (isNaN(currentNumber)) currentNumber = 0;

        let result = 0;

        switch (currentOperator) {
            case "+":
                result = lastValue + currentNumber;
                break;
            case "-":
                result = lastValue - currentNumber;
                break;
            case "*":
                result = lastValue * currentNumber;
                break;
            case "/":
                result = currentNumber === 0 ? "Ошибка" : lastValue / currentNumber;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        lastValue = null;
        currentOperator = null;
        decimalAdded = currentInput.includes(".");
        updateInputField(currentInput);
    }
}

document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", function() {
        const value = this.getAttribute("data-value");

        if (!isNaN(value)) {
            appendToInput(value);
        } else if (value === ".") {
            appendToInput(value);
        } else if (value === "+" || value === "-" || value === "*" || value === "/") {
            handleOperator(value);
        }
    });
});

document.getElementById("equal").addEventListener("click", calculate);

document.getElementById("ac").addEventListener("click", clearAll);

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (!isNaN(key)) {
        appendToInput(key);
    } else if (key === ".") {
        appendToInput(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperator(key);
    } else if (key === "=" || key === "Enter") {
        calculate();
    } else if (key === "Escape" || key === "Backspace") {
        clearAll();
    }
});