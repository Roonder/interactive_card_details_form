// Variables
const main = document.querySelector('main');
const form = document.querySelector('.card-form');
const confirmed = document.querySelector('.confirmed');
const submitBtn = document.querySelector('#submit');
const confirmedBtn = document.querySelector('#confirmed');
// Inputs
const inputName = document.querySelector('#name');
const inputNumber = document.querySelector('#number');
const inputExpM = document.querySelector('#expM');
const inputExpY = document.querySelector('#expY');
const inputCvc = document.querySelector('#cvc');
// Listeners
document.addEventListener('DOMContentLoaded', () => {
    inputName.addEventListener('blur', inputValidator);
    inputNumber.addEventListener('blur', inputValidator);
    inputExpM.addEventListener('blur', inputValidator);
    inputExpY.addEventListener('blur', inputValidator);
    inputCvc.addEventListener('blur', inputValidator);

    // Submit and Confirmation
    submitBtn.addEventListener('click', submit);
    confirmedBtn.addEventListener('click', reset);
});

// Inputs Info
const info = {
    name: '',
    number: '',
    exp: ['00', '00'],
    cvc: ''
}
// Local Storage - Inputs
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', buildInfo);
});

// Build Info
function buildInfo(e) {
    const idCheck = e.target.id;
    const value = e.target.value;

    if(idCheck === 'name') {
        info.name = value;
    }
    if(idCheck === 'number'){
        info.number = value;
    }
    if(idCheck === 'expM'){
        info.exp[0] = value;
    }
    if(idCheck === 'expY'){
        info.exp[1] = value;
    }
    if(idCheck === 'cvc'){
        info.cvc = value;
    }
    
    console.log(e.target);
    assignInfo();
}

// Virtual DOM
function assignInfo() {
    const { name, number, exp, cvc} = info;
    const frontCard = document.querySelector('.front-card');
    const cardName = frontCard.children[2].firstElementChild.children[0];
    const cardExp = frontCard.children[2].lastElementChild.children[0];
    const cardNumber = frontCard.children[1].firstElementChild;

    const backCard = document.querySelector('.back-card');
    const cardCvc = backCard.firstElementChild.children[0];

    cardName.textContent = 'Jane Appleseed';
    cardExp.textContent = '00/00';
    cardNumber.textContent = '0000 0000 0000 0000';
    cardCvc.textContent = '123';

    if(name !== '') {
        cardName.textContent = name;
    }
    if( number !== '') {
        cardNumber.textContent = `${number.substring(0,4)} ${number.substring(4,8)} ${number.substring(8,12)} ${number.substring(12,16)}`;
    }
    if( exp !== []) {
        cardExp.textContent = `${exp[0]}/${exp[1]}`;
    }
    if( cvc !== ''){
        cardCvc.textContent = info.cvc;
    }
}

// Validator
function inputValidator(e) {
    // Names and All Inputs
    if(e.target.value === '') {
        if(e.target.id === 'cvc'){
            e.target.classList.add('error');
            showError(e, 'Can\´t be blank', e.target.parentElement.nextSibling);
            assignStyles();
            return;
        }
        if(e.target.id === 'expM' || e.target.id === 'expY'){
            e.target.classList.add('error');
            showError(e, 'Can\´t be blank', e.target.parentElement.nextSibling);
            assignStyles('flex-start');
            return;
        }
        e.target.classList.add('error');
        showError(e, 'Can\´t be blank');
        assignStyles();
        return;
    } else {
        errorRemover(e);
    }
    // Card Number
    if(e.target.id === 'number'){
        const number = e.target.value;
        const regexNumber = /^\d+$/;
        if(regexNumber.test(number)) {
            errorRemover(e);
        } else {
            e.target.classList.add('error');
            showError(e, 'Wrong format. Only numbers required');
            assignStyles();
        }
        if(e.target.value.length !== 16){
            e.target.classList.add('error');
            showError(e, '16 digits required');
            assignStyles();
        } else {
            errorRemover(e);
        }
    }

    // Expiration Date
    if(e.target.id === 'expM') {
        if(e.target.value > 12) {
            e.target.classList.add('error');
            showError(e, 'Introduce a valid date', e.target.parentElement.nextSibling);
            assignStyles();
        } else {
            e.target.classList.remove('error');
            errorRemover(e);
        }
    }
    // CVC
    if(e.target.id === 'cvc'){
        if(e.target.value.length !== 3) {
            e.target.classList.add('error');
            showError(e, 'Introduce a valid CVC', e.target.parentElement.nextSibling);
            assignStyles();
        } else {
            errorRemover(e);
        }
    }
}

// Errors
function showError(e, message, reference = e.target.nextSibling) {
    const p = document.createElement('P');
    p.classList.add('error__text');
    p.textContent = message;
    form.insertBefore(p, reference);
}

function errorRemover(e) {
    const errores = document.querySelectorAll('.error__text');
    if(errores){
        e.target.classList.remove('error');
        errores.forEach(error => {
            error.remove();
        })
    }
}

// Styles
function assignStyles(align = 'flex-end') {
    const erroresText = document.querySelectorAll('.error__text');
    erroresText.forEach(error => {
        error.style.fontSize = '1.2rem';
        error.style.color = '#ff5252';
        error.style.alignSelf = align;
    });
}

// Submits
function submit(e){
    const { name, number, exp, cvc} = info;
    const erroresArray = [];
    const errores = document.querySelectorAll('.error__text');
    errores.forEach(error => {
        erroresArray.push(error);
    })
    e.preventDefault();
    if(name !== '' && number !== '' && exp !== ['00','00'] && cvc !== '' && erroresArray.length === 0) {
        main.classList.add('unshow');
        confirmed.classList.remove('unshow');
        errorRemover(e);
    } else {
        showError(e, 'Verify all previous fields', e.nextSibling);
        assignStyles('center');
    }
}

function reset(e) {
    e.preventDefault();
    main.classList.remove('unshow');
    confirmed.classList.add('unshow');
    cardDefaults();
    form.reset();

}
// Set default values
function cardDefaults() {
    const frontCard = document.querySelector('.front-card');
    const cardName = frontCard.children[2].firstElementChild.children[0];
    const cardExp = frontCard.children[2].lastElementChild.children[0];
    const cardNumber = frontCard.children[1].firstElementChild;

    const backCard = document.querySelector('.back-card');
    const cardCvc = backCard.firstElementChild.children[0];

    cardName.textContent = 'Jane Appleseed';
    cardExp.textContent = '00/00';
    cardNumber.textContent = '0000 0000 0000 0000';
    cardCvc.textContent = '123';
}