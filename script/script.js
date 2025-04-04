const generatedPassword = document.getElementById('generated-password');
const passwordLengthRange = document.getElementById('password-length-range');
const passwordLengthText = document.getElementById('password-length-txt');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('special-characters');

const btnGenerate = document.getElementById('btnGenerate');
const btnCopy = document.getElementById('btnCopy');

const state = document.querySelectorAll('.x-wrapper__option input');
const form = document.querySelector('#form')

let passwordProperties = new Map();

// Set selected password properties
const setPasswordProperties = () => {
    passwordProperties.set('uppercaseLetters', state[0].checked);
    passwordProperties.set('lowercaseLetters', state[1].checked);
    passwordProperties.set('numbers', state[2].checked);
    passwordProperties.set('symbols', state[3].checked);
}

// Generate random numbers, uppercase, lowercase and symbols
const generateRandomNumber = (e) => {
    return Math.floor(Math.random() * 10).toString();
}

const generateRandomUppercase = (e) => {
    const randomNumber = Math.floor(Math.random() * 26) + 65
    return String.fromCharCode(randomNumber);
}

const generateRandomLowercase = (e) => {
    const randomNumber = Math.floor(Math.random() * 26) + 97
    return String.fromCharCode(randomNumber);
}

const generateRandomSymbol = (e) => {
    const symbols = '!@#$%^&*()_-+[]{}|;:,.<>?';
    const randomNumber = Math.floor(Math.random() * symbols.length);
    return symbols[randomNumber];
}

// Define password functions
const passwordFunctions = [generateRandomUppercase, generateRandomLowercase, generateRandomNumber, generateRandomSymbol];

const generatePassword = (passwordLength, passwordOptions, passwordFunctions) => {

    setPasswordProperties();

    if (!passwordLength) {
        return;
    }
    let selectedOptionsCount = 0;
    for (let [key, value] of passwordOptions) {
        if (value) {
            selectedOptionsCount++;
        }
    }
    
    if (selectedOptionsCount === 0) {
        return;
    }

    let passwordFunctionsMap = new Map();
    let index = 0;
    let skippedOtionsIndexes = [];
    for (let [key, value] of passwordOptions) {
        if (value) {
            passwordFunctionsMap.set(key, passwordFunctions[index]);
        } else {
            skippedOtionsIndexes.push(index);
        }
        index++;
    }
    
    const passwordPropertiesKeys = ['uppercaseLetters', 'lowercaseLetters', 'numbers', 'symbols'];
    const selectedPasswordOptionKeys = [];
    passwordPropertiesKeys.forEach( (element, index) => {
        if (!skippedOtionsIndexes.includes(index)) {
            selectedPasswordOptionKeys.push(element);
        }
    });

    const passwordArray = [];
    for (let i = 0; i < passwordLength; i++) {
        const randomOption = Math.floor(Math.random() * selectedPasswordOptionKeys.length);
        const passwordSpecificFunction = passwordFunctionsMap.get(selectedPasswordOptionKeys[randomOption]);
        passwordArray.push(passwordSpecificFunction());
    }
    generatedPassword.value = passwordArray.join('');
    passwordLengthText.innerText = passwordArray.length;
};


document.addEventListener('DOMContentLoaded', () => {
    passwordLengthRange.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    uppercase.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    lowercase.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    numbers.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    symbols.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    btnGenerate.addEventListener('click', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    btnCopy.addEventListener('click', () => copyToClipboard());
    
    uppercase.addEventListener('input', () =>  checkedLettersOption());
    lowercase.addEventListener('input', () =>  checkedLettersOption());
    numbers.addEventListener('input', () =>  checkedLettersOption());
    symbols.addEventListener('input', () =>  checkedLettersOption());

    // Prevent form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })
    // Set default password length text
    lowercase.checked = true;
    generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions);
})

const checkedLettersOption = () => {
    // Check if at least one option is selected
    if (!uppercase.checked && !lowercase.checked && !numbers.checked && !symbols.checked) {
        lowercase.checked = true;
        generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions);
    }
}

const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword.value.toString());
}