const visor = document.querySelector('.visor h4');
const buttons = document.querySelector('.buttons');
const misc = [...buttons.querySelectorAll('.misc button')];
const numbers = [...buttons.querySelectorAll('[data-number]')];
const operations = [...buttons.querySelectorAll('.operation')];

function inputNumber() {
    const number = this.getAttribute('data-number');
    visor.textContent += number;
}

function clearOrErase(){
    const button = this;
    let lastDigit = visor.textContent[visor.textContent.length - 1];
    if (button.classList.contains('clear'))
        visor.textContent = '';
    else
        visor.textContent = visor.textContent.replace(lastDigit, '');
}

function compute(a, b) {
    if ([...visor.textContent].includes('+')) {
        return a + b;
    } else if ([...visor.textContent].includes('-')) {
        return a - b;
    } else if ([...visor.textContent].includes('x')) {
        return a * b;
    } else {
        return a / b;
    }
}

function executeOperation(){
    const operation = this.textContent;
    const hasDigit = visor.textContent.match(/\d/) !== null ? true : false;
    const hasOperation = visor.textContent.includes(operation) ? true : false;
    if (hasDigit && !hasOperation) {
        visor.textContent += operation;
    }
    if (operation === '=') {
        const rawInput = visor.textContent.match(/\d*/g);
        const input = rawInput.filter(item => item !== '');
        let result = 0;
        let number = [];
        input.forEach((num) => {
            number.push(parseInt(num));
        });
        result = compute(number[0], number[1]);
        visor.textContent = '';
        visor.textContent = result === 0 ? '' : result;
    }
}

numbers.forEach(btn => {
    btn.addEventListener('click', inputNumber);
})

operations.forEach(btn => {
    btn.addEventListener('click', executeOperation);
})

misc.forEach(btn => {
    btn.addEventListener('click', clearOrErase);
})