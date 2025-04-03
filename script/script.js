const passwordLength = document.getElementById('password-length-txt'); // Ensure this is an <input> element
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('special-characters');
const state = document.querySelectorAll('.x-wrapper__option input')
    
const generatePassword = () => {
    console.log('Generating password...');

    console.log('Password length:', passwordLength);
    console.log('Uppercase:', uppercase); 
    console.log('Lowercase:', lowercase);
    console.log('Numbers:', numbers);
    console.log('Symbols:', symbols);
    console.log('State:', state);


    let passwordOptions = new Map();
    passwordOptions.set('uppercaseLetters', state[0].checked);
    passwordOptions.set('lowercaseLetters', state[1].checked);
    passwordOptions.set('numbers', state[2].checked);
    passwordOptions.set('symbols', state[3].checked);
    console.log('Password options:', passwordOptions);

};



document.addEventListener('DOMContentLoaded', () => {
    generatePassword();
    uppercase.addEventListener('change', () => randomNumber());
    console.log('passwordLength', passwordLength.value);
    console.log('DOMContentLoaded event fired');
    console.log('Password length:', passwordLength.value);
})

const randomLetter = (e) => {
    const randomNumber = Math.floor(Math.random() * 26) + 97
    console.log(String.fromCharCode(randomNumber));
}