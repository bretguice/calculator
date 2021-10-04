let firstNumber = null;
let secondNumber = null;
let outputValue = "0";
let answer = null;
let firstOperator = null;
let secondOperator = null;
const errorMessage = "NAN"
const outputSize = 16;
const expoSize = 8;
const output = document.querySelector("#output");
const btn = document.querySelectorAll("button");

window.addEventListener("keydown", keyInput);
// keypad calculator functionality
function keyInput (e) {
    console.log(e.key);
    if(e.key >=0 && e.key <= 9) {
        inputNumber(e.key);
        outputAnswer();
    } else if (e.key === "Backspace") {
        backspaceClear();
        outputAnswer();
    } else if (e.key === "Delete") {
        clearEntry();
        outputAnswer();
    } else if (e.key === "Escape") {
        clearAll();
        outputAnswer();
    } else if (e.key === "Enter" || e.key === "=") {
        solveEquation();
        outputAnswer();
    } else if (e.key === ".") {
        checkForDecimal(e.key);
        outputAnswer();
    } else if (e.key === "+" || e.key ==="-" || e.key ==="*" || e.key==="/") {
        inputOperator(e.key);
    }
}

// core calculator functionality
function useCalculator() {
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function (){
            if (btn[i].classList.contains("number")){
                inputNumber(btn[i].value);
                outputAnswer(); 
            } else if(btn[i].classList.contains("operator")){
                inputOperator(btn[i].value);
            } else if (btn[i].classList.contains("equals")) {
                solveEquation();
                outputAnswer();
            } else if (btn[i].classList.contains("clear")) {
                clearData(btn[i].value);
                outputAnswer();
            } else if (btn[i].classList.contains("special-operator")) {
                inputOperator(btn[i].value);
                solveEquation();
                outputAnswer();
            }  else if (btn[i].classList.contains("character")) {
                checkForDecimal(btn[i].value);
                outputAnswer();
            } 
            
            })
    }
}
useCalculator();
// Input number
function inputNumber(operand) {
    // check to see if firstNumber value has been set
    // if firstNumber value is not yet set then we can set this value towards that
    if(firstNumber === null ) {
        if(outputValue === "0" ) {
            outputValue = operand;
        } else if(outputValue === firstNumber){
            outputValue = operand;
        } else {
            outputValue += operand;
        }
        // if first number is set then set secondNumber
    } else { 
        if(outputValue === firstNumber ){
            outputValue = operand;
        } else {
            outputValue += operand;           
        } 
        secondNumber = outputValue;
    }

}

// Check logic to place the decimal at the correct space
// If decimal is first character used then add it after the "0"
function checkForDecimal(decimal) {
    if (outputValue === "0" ) {
        outputValue = "0";
        outputValue += decimal;
        // make sure there is only one decimal allowed
    } else if (!outputValue.includes(decimal)) {
        outputValue += decimal;
    }         
}
// Sets the value of the operator
function inputOperator(operator) {
    if (firstOperator === null) {
        firstNumber = outputValue;
        firstOperator = operator;
    } else {
        solveEquation();
    }
}

function solveEquation() {
    // no action to do if no operator set
    if(firstOperator === null) {
        outputValue = outputValue;
        // solve equation for one single number equations
    } else if (firstOperator === "squareroot" || 
    firstOperator === "square" ||
    firstOperator === "fraction" ||
    firstOperator === 'percent' ||
    firstOperator === "negate" && firstNumber != null) {
    answer = specialOperate(firstNumber, firstOperator).toString();
    outputValue = answer;
    firstOperator = null;
    firstNumber = answer;    
    // equation to run after both numbers and the operator is set   
    } else if (firstOperator != null && firstNumber != null && secondNumber != null) {
        answer = operate(+firstNumber, +secondNumber, firstOperator).toString();
        outputValue = answer;
        firstOperator = null;
        firstNumber = answer;
    } 

}
// display answer that is clamped to size of screen
function outputAnswer() {
    if (outputValue.length < outputSize){
     output.textContent = outputValue;
    } else if (outputValue.length >= outputSize) {
        output.textContent = Number.parseInt(outputValue).toExponential(expoSize);
    }
 }

 function clearData(clear) {
     if (clear === "clear-all") {
         clearAll();
    } else if (clear === "backspace") {
        backspaceClear();
    } else if (clear === "clear-entry") {
        clearEntry();
    }
 }
 function clearAll() {
    firstNumber = null;
    secondNumber= null;
    firstOperator = null;
    outputValue = "0";
 }
 function clearEntry() {
    outputValue = "0";
 }

 function backspaceClear() {
    if(outputValue.length > 1) {
        let backspaceValue = outputValue.slice(0, -1);
        outputValue = backspaceValue;
        }else {
            outputValue = "0";
        }
 }
// basic arithmetic involving 2 numbers and an operator
 function operate (x, y, operator){
       if (operator === "+"){
         return x + y;
     } else if (operator === "-") {
         return x - y;
     } else if (operator === "*") {
         return x * y;
     } else if (operator === "/") {
         if(y === 0){
             output.textContent = errorMessage;
         } else {
             return x / y;
         }
     }
 }
// arithmetic involving a single number
 function specialOperate(x, operator) {
    if (operator === "square") {
        return x * x;
    } else if (operator === "squareroot") {
        return Math.sqrt(x);
    } else if (operator === "fraction") {
       if(x === 0){
           output.textContent = errorMessage;
       } else {
         console.log('return value')
           return 1 / x;
       } 
    } else if (operator === "percent") {
       return x/100;
   } else if (operator === "negate") {
       return x * -1;
   }
 }