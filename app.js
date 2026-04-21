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

// 3. Podpinamy funkcję obliczania pod przycisk "="
btnEqual.addEventListener('click', () => {
    // Sprawdzamy, czy mamy obie liczby do dodania
    if (currentInput === '' || previousInput === '') return;
    
    // Jeśli wybranym operatorem jest dodawanie, wykonujemy działanie
    if (operator === '+') {
        // Używamy parseFloat, by zamienić tekst na liczby, a następnie je dodajemy
        const result = parseFloat(previousInput) + parseFloat(currentInput);
        
        // Aktualizujemy zmienne i wyświetlamy wynik
        currentInput = result.toString();
        display.innerText = currentInput;
        previousInput = '';
        operator = '';
    }
});

// 4. Podpinamy czyszczenie kalkulatora pod przycisk "C"
btnClear.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.innerText = '0';
});