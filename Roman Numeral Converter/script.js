const input = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const romanNumerals = [
    {roman: 1000, numeral: 'M'},
    {roman: 900, numeral: 'CM'},
    {roman: 500, numeral: 'D'},
    {roman: 400, numeral: 'CD'},
    {roman: 100, numeral: 'C'},
    {roman: 90, numeral: 'XC'},
    {roman: 50, numeral: 'L'},
    {roman: 40, numeral: 'XL'},
    {roman: 10, numeral: 'X'},
    {roman: 9, numeral: 'IX'},
    {roman: 5, numeral: 'V'},
    {roman: 4, numeral: 'IV'},
    {roman: 1, numeral: 'I'},
];

const toRoman = (num) => {
    let romanNumeral = '';
    for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i].roman) {
            romanNumeral += romanNumerals[i].numeral;
            num -= romanNumerals[i].roman;
        }
    }
    return romanNumeral;    
};

const checkUserInput = () => {
    const inputValue = parseInt(input.value);

    if (isNaN(inputValue)) {
        output.textContent = 'Please enter a valid number';
    } else if (inputValue < 1) {
        output.textContent = 'Please enter a number greater than or equal to 1';
    } else if (inputValue > 3999) {
        output.textContent = 'Please enter a number less than or equal to 3999';
    } else {
        const result = toRoman(inputValue);
        output.textContent = result;
    }
}

convertBtn.addEventListener('click', () => {
    checkUserInput();
    input.value = '';
});

input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        checkUserInput();
        input.value = '';
    }
});