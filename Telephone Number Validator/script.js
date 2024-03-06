const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const results = document.getElementById('results-div');

const phoneNumberRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

const validator = num => phoneNumberRegex.test(num);

checkBtn.addEventListener('click',() => {
    const phoneNumber = userInput.value.trim();
    if (phoneNumber === "") {
        alert("Please provide a phone number");
        return;
    }

    results.textContent = validator(phoneNumber)
        ? `Valid US number: ${phoneNumber}`
        : `Invalid US number: ${phoneNumber}`
    ;
});

clearBtn.addEventListener('click', () => {
    results.textContent = "";
    userInput.value = "";
});