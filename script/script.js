const generatePassword = () => {
    console.log('Generating password...');

    const passwordLength = document.getElementById('password-length-txt').value;
    const uppercase = document.getElementById('uppercase').value;
    const lowercase = document.getElementById('lowercase').value;
    const numbers = document.getElementById('numbers').value;
    const symbols = document.getElementById('special-characters').value;

    console.log('Password length:', passwordLength);
    console.log('Uppercase:', uppercase); 
    console.log('Lowercase:', lowercase);
    console.log('Numbers:', numbers);
    console.log('Symbols:', symbols);
};

document.addEventListener('DOMContentLoaded', () => {
    generatePassword();
})