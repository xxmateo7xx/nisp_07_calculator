// Pobieramy elementy z naszego HTML
const display = document.getElementById('display');
const numbers = document.querySelectorAll('.number');
const btnAdd = document.getElementById('btn-add');
const btnEqual = document.getElementById('btn-equal');
const btnClear = document.getElementById('btn-clear');

// Zmienne do przechowywania wpisywanych wartości
let currentInput = '';
let previousInput = '';
let operator = '';

// 1. Podpinamy nasłuchiwanie kliknięć pod wszystkie przyciski z cyframi
numbers.forEach(button => {
    button.addEventListener('click', () => {
        // Zabezpieczenie: nie pozwalamy wpisać kilku zer na początku
        if (currentInput === '0' && button.innerText === '0') return;
        
        // Dodajemy klikniętą cyfrę do aktualnego ciągu i wyświetlamy na ekranie
        currentInput += button.innerText;
        display.innerText = currentInput;
    });
});

// 2. Podpinamy funkcję DODAWANIA pod przycisk "+"
btnAdd.addEventListener('click', () => {
    // Jeśli nic nie wpisano, nie robimy nic
    if (currentInput === '') return;
    
    // Przenosimy aktualną liczbę do pamięci, czyścimy ekran i ustawiamy operator na "+"
    previousInput = currentInput;
    currentInput = '';
    operator = '+';
});

// OSTATECZNA funkcja obliczania pod przyciskiem "="
btnEqual.addEventListener('click', () => {
    // Sprawdzamy, czy mamy obie liczby do działania
    if (currentInput === '' || previousInput === '') return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    // Wykonujemy odpowiednie działanie na podstawie wybranego operatora
    if (operator === '+') {
        result = prev + current;
    } else if (operator === '-') {
        result = prev - current;
    } else if (operator === '*') {
        result = prev * current;
    } else if (operator === '/') {
        // Zabezpieczenie przed dzieleniem przez zero!
        if (current === 0) {
            display.innerText = "Błąd";
            currentInput = '';
            previousInput = '';
            operator = '';
            return; // Przerywamy działanie funkcji
        }
        result = prev / current;
    }
    
    // Aktualizujemy zmienne i wyświetlamy wynik
    currentInput = result.toString();
    display.innerText = currentInput;
    previousInput = '';
    operator = '';
});

// 4. Podpinamy czyszczenie kalkulatora pod przycisk "C"
btnClear.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.innerText = '0';
});

// Pobieramy przycisk odejmowania
const btnSub = document.getElementById('btn-sub');

// Podpinamy funkcję ODEJMOWANIA pod przycisk "-"
btnSub.addEventListener('click', () => {
    // Jeśli nic nie wpisano, nie robimy nic
    if (currentInput === '') return;
    
    // Przenosimy aktualną liczbę do pamięci, czyścimy ekran i ustawiamy operator na "-"
    previousInput = currentInput;
    currentInput = '';
    operator = '-';
});

// Pobieramy przyciski mnożenia i dzielenia
const btnMul = document.getElementById('btn-mul');
const btnDiv = document.getElementById('btn-div');

// Podpinamy MNOŻENIE pod przycisk "*"
btnMul.addEventListener('click', () => {
    if (currentInput === '') return;
    previousInput = currentInput;
    currentInput = '';
    operator = '*';
});

// Podpinamy DZIELENIE pod przycisk "/"
btnDiv.addEventListener('click', () => {
    if (currentInput === '') return;
    previousInput = currentInput;
    currentInput = '';
    operator = '/';
});