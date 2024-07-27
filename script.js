// Definition of class with properties
class Calculator {
    constructor(previousOpTextElement, currentOpTextElement) {
        this.previousOpTextElement = previousOpTextElement;
        this.currentOpTextElement = currentOpTextElement;
        this.clear(); // Call clear when initalized
    }
// Initalizes curr&preOp variables and sets operation value
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
// mapped to deleteButton, returns currentOperand without last digit.
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0 , -1)
    }
// mapped to (all) operation buttons, 
    chooseOperation(operation) {
        if(this.currentOperand === '') return // shuts down if no input

        if(this.previousOperand !== '') { // check for valid prevOp value
            this.compute();
        }
// moving from curr to prev and storing the operation
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
// Mapped to numberButtons, Combines currentOperand + numberButton pressed
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return 

        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

// Mapped to equals button, performs a computation based on an input case
// parseFloat's both prev & curr converts to number for operation
   compute() {
        let computation

        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
// either are false return
        if(isNaN(prev) || isNaN(current)) return
// Only runs if both prev and current are present
        switch(this.operation) {
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case '*': 
                computation = prev * current
                break
            case '÷': 
                computation = prev / current
                break
            default:
                return;
        }
// Reset to new state after swtich statement is complete.
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
    }
// only ever called with updateDisplay()
   getDisplayNumber(number) {
// convert number to string 
        const stringNumber =  number.toString()
// Parse and split digits to the right of decimal (integer half), we parse 
// So that when we call toLocaleString() it formats the number specific to
// A given language parameter
        const integerDigits = parseFloat(stringNumber.split('.')[0])
// Split left portion (decimals). Note that we don't parse this number, no
// Formatting necessary
        const decimalDigits = stringNumber.split('.')[1]
// Initalize variable
        let integerDisplay
// if anything other than number is selected integerDisplay = ''
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
// else when it does its formatted to en sensitive language
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 });
        }
// case where . is present we return integerDigits.decimalDigits
        if(decimalDigits != null) {
// String interpolation
            return `${integerDigits}.${decimalDigits}`
        } else {
// no decimal present returh integerDisplay value
            return integerDisplay
        }
    }
// Called within every funtion. 
    updateDisplay() {
// call to getDisplayNumber to bind to currencurrentOpTextElement.innerText
        this.currentOpTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
// operation check, if so append with previousOperand to previousOpTextElement.innerText
// else previousOpTextElement '' 
        if(this.operation != null) {
            this.previousOpTextElement.innerText =
            `${this.previousOperand} ${this.operation}` 
        } else {
            this.previousOpTextElement.innerText = ''
        }
    }

}
// Variables mapped to html doc with specific attribute
const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const currentOpTextElement = document.querySelector('[data-current-operand]');
const previousOpTextElement = document.querySelector('[data-previous-operand]');

// Initalize instance of Calculator class
const calculator = new Calculator(previousOpTextElement, currentOpTextElement)

// Event listeners for each of the above variables triggring specific
// Instance methods
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

//class Calculator {
//    constructor(previousOpTextElement, currentOpTextElement) {
//        this.previousOpTextElement = previousOpTextElement;
//        this.currentOpTextElement = currentOpTextElement;
//        this.clear()
//    }
//
//    clear() {
//        this.currentOperand = ''
//        this.previousOperand = ''
//        this.operation = undefined
//    }
//
//// delete up to but not including the last ele. Removes last ele & returns 
//    delete() {
//        this.currentOperand = this.currentOperand.toString().slice(0, -1)
//    }
//
//    chooseOperation(operation) {
//        if (this.currentOperand === '') return
//
//        if (this.previousOperand !== '') {
//            this.compute()
//        }
//
//        this.operation = operation
//        this.previousOperand = this.currentOperand
//        this.currentOperand = ''
//    }
//
//    appendNumber(number) {
//        if (number === '.' && this.currentOperand.includes('.')) return
//
//        this.currentOperand = this.currentOperand.toString() + number.toString()
//    }
//
//    compute() {
//        let computation;
//
//        const prev = parseFloat(this.previousOperand)
//        const current = parseFloat(this.currentOperand)
//
//        if(isNaN(prev) || isNaN(current)) return
//
//        switch (this.operation) {
//            case '+':
//                computation = prev + current;
//                break
//            case '-':
//                computation = prev - current;
//                break
//            case '*':
//                computation = prev * current;
//                break
//            case '÷':
//                computation = prev / current;
//                break
//            default:
//                return
//        }
//        this.currentOperand = computation
//        this.previousOperand = ''
//        this.operation = undefined
//    }
//
//    getDisplayNumber(number) {
//        const stringNumber = number.toString()
//        const integerDigits = parseFloat(stringNumber.split('.')[0])
//        const decimalDigits = stringNumber.split('.')[1]
//
//        let integerDisplay
//
//        if(isNaN(integerDigits)) {
//            integerDisplay = ''
//        } else {
//            integerDisplay = integerDigits.toLocaleString('en', {
//            maximumFractionDigits: 0 })
//            }
//
//        if(decimalDigits != null) {
//            return `${integerDisplay}.${decimalDigits}`
//        } else {
//            return integerDisplay
//        }
//    }
//
//    updateDisplay() {
//        this.currentOpTextElement.innerText =
//        this.getDisplayNumber(this.currentOperand)
//
//        if(this.operation != null) {
//            this.previousOpTextElement.innerText = 
//            `${this.previousOperand} ${this.operation}`
//        } else {
//            this.previousOpTextElement.innerText = ''
//        }
//    }
//}
//
//const numberButtons = document.querySelectorAll('[data-number]');
//const operationsButtons = document.querySelectorAll('[data-operation]');
//const equalsButton = document.querySelector('[data-equals]');
//const allClearButton = document.querySelector('[data-all-clear]');
//const deleteButton = document.querySelector('[data-delete]');
//const previousOpTextElement = document.querySelector('[data-previous-operand]');
//const currentOpTextElement = document.querySelector('[data-current-operand]');
//
//const calculator = new Calculator(previousOpTextElement, currentOpTextElement);
//
//numberButtons.forEach(button => {
//    button.addEventListener('click', () => {
//        calculator.appendNumber(button.innerText)
//        calculator.updateDisplay()
//    })
//})
//
//operationsButtons.forEach(button => {
//    button.addEventListener('click', () => {
//        calculator.chooseOperation(button.innerText)
//        calculator.updateDisplay()
//    })
//})
//
//equalsButton.addEventListener('click', button => {
//    calculator.compute()
//    calculator.updateDisplay()
//}) 
//
//allClearButton.addEventListener('click', button => {
//    calculator.clear()
//    calculator.updateDisplay()
//})
//
//deleteButton.addEventListener('click', button => {
//    calculator.delete()
//    calculator.updateDisplay()
//})
