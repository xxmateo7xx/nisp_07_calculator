const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Zmienna trzymająca całe równanie (np. "2+3*(4-1)")
let expression = '';

// Słownik priorytetów operatorów dla algorytmu Shunting-yard
const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
};

// 1. Podpinamy kliknięcia pod wszystkie przyciski
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const val = button.innerText;

        if (val === 'C') {
            expression = '';
            display.innerText = '0';
        } else if (val === '=') {
            try {
                // Odpalamy całą magię ONP
                const tokens = tokenize(expression);
                const rpn = infixToRPN(tokens);
                const result = evaluateRPN(rpn);
                
                display.innerText = result;
                expression = result.toString(); // Wynik staje się nowym początkiem
            } catch (error) {
                display.innerText = 'Błąd';
                expression = '';
            }
        } else {
            // Dodajemy znak do równania
            if (expression === '0') expression = '';
            expression += val;
            display.innerText = expression;
        }
    });
});

// --- LOGIKA ONP (Odwrotna Notacja Polska) ---

// Funkcja 1: Rozbija tekst "2+23" na tablicę ["2", "+", "23"]
function tokenize(expr) {
    // Używamy Regexa do wyłapania liczb (nawet wielocyfrowych) i operatorów
    const tokens = expr.match(/\d+|\+|\-|\*|\/|\(|\)/g);
    return tokens || [];
}

// Funkcja 2: Algorytm Shunting-yard (zamienia tradycyjny zapis na ONP)
function infixToRPN(tokens) {
    const outputQueue = [];
    const operatorStack = [];

    for (let token of tokens) {
        if (!isNaN(token)) {
            // Jeśli to liczba, idzie prosto do wyjścia
            outputQueue.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            // Wyrzucamy operatory z wężyka aż trafimy na lewy nawias
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop(); // Usuwamy lewy nawias ze stosu
        } else {
            // Jeśli to operator (+, -, *, /)
            while (
                operatorStack.length > 0 &&
                operatorStack[operatorStack.length - 1] !== '(' &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    }

    // Wrzucamy resztę operatorów na wyjście
    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
}

// Funkcja 3: Oblicza wynik ze stosu ONP
function evaluateRPN(rpnQueue) {
    const stack = [];

    for (let token of rpnQueue) {
        if (!isNaN(token)) {
            // Liczby wrzucamy na stos
            stack.push(parseFloat(token));
        } else {
            // Operator pobiera dwie ostatnie liczby ze stosu i wykonuje działanie
            const b = stack.pop();
            const a = stack.pop();

            if (token === '+') stack.push(a + b);
            if (token === '-') stack.push(a - b);
            if (token === '*') stack.push(a * b);
            if (token === '/') {
                if (b === 0) throw new Error("Dzielenie przez 0");
                stack.push(a / b);
            }
        }
    }

    return stack[0]; // Na koniec na stosie zostaje tylko wynik
}