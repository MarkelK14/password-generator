const generatedPassword = document.getElementById('generated-password');
const passwordLengthRange = document.getElementById('password-length-range');
const passwordLengthText = document.getElementById('password-length-txt');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('special-characters');

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
    const randomNumber = Math.floor(Math.random() * 26) + 97
    return String.fromCharCode(randomNumber);
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
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    const randomNumber = Math.floor(Math.random() * symbols.length);
    return symbols[randomNumber];
}

// Define password functions
const passwordFunctions = [generateRandomUppercase, generateRandomLowercase, generateRandomNumber, generateRandomSymbol];

const generatePassword = (passwordLength, passwordOptions, passwordFunctions) => {

    console.log('passwordLength', passwordLength);

    setPasswordProperties();

    if (!passwordLength) {
        return;
    }
    let optionsCount = 0;
    for (let [key, value] of passwordOptions) {
        if (value) {
            optionsCount++;
        }
    }
    
    if (optionsCount === 0) {
        return;
    }

    let passwordFunctionsMap = new Map();
    let index = 0;
    let optionsSkippedIndex = [];
    for (let [key, value] of passwordOptions) {
        if (value) {
            passwordFunctionsMap.set(key, passwordFunctions[index]);
        } else {
            optionsSkippedIndex.push(index);
        }
        index++;
    }
    
    const passwordOptionKeys = ['uppercaseLetters', 'lowercaseLetters', 'numbers', 'symbols'];
    const ultimatePasswordOptionKeys = [];
    passwordOptionKeys.forEach( (element, index) => {
        if (!optionsSkippedIndex.includes(index)) {
            ultimatePasswordOptionKeys.push(element);
        }
    });

    const passwordArray = [];
    for (let i = 0; i < passwordLength; i++) {
        const randomOption = Math.floor(Math.random() * ultimatePasswordOptionKeys.length);
        const passwordSpecificFunction = passwordFunctionsMap.get(ultimatePasswordOptionKeys[randomOption]);
        passwordArray.push(passwordSpecificFunction());
    }
    generatedPassword.value = passwordArray.join('');
    console.log('passwordArray', passwordArray)
    console.log('passwordArray.join()', passwordArray.join(''));
    console.log('generatedPassword.innerHTML', generatedPassword.innerHTML);
};


document.addEventListener('DOMContentLoaded', () => {
    passwordLengthRange.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    uppercase.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    lowercase.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    numbers.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    symbols.addEventListener('input', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    btnGenerate.addEventListener('click', () => generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions));
    
    // Prevent form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })
    // Set default password length text
    generatePassword(passwordLengthRange.value, passwordProperties, passwordFunctions);
})

