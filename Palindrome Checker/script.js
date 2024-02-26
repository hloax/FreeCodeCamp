const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const results = document.getElementById('result');

const isPalindrome = (str) => {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = clean.split('')
                        .reverse()
                        .join('');
    return clean === reversed;                    

};

checkButton.addEventListener ("click", () => {
    const userInput = textInput.value.trim();

    if (userInput.length > 0) {
        const isPalindromic = isPalindrome(userInput);
        const resultMessage = isPalindromic ? "a palindrome" : "not a palindrome";
        results.innerHTML = `<p>${userInput} is ${resultMessage} </p>`;
    } else {
        alert("Please input a value");
    }
    
});