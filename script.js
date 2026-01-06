let questions = [];
let currentQuestion = 0;
let correctAnswers = 0;
let timer = 7;
let timerInterval;
let userInput = "";


function generateQuestions() {
    questions = [];
    for (let i = 0; i < 25; i++) {
        const a = Math.floor(Math.random() * 13);
        const b = Math.floor(Math.random() * 13);
        questions.push({ a, b, answer: a * b });
    }
}

function startGame() {
    generateQuestions();
    currentQuestion = 0;
    correctAnswers = 0;
    document.getElementById("score").textContent = 0;
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion >= 25) {
        endGame();
        return;
    }

    userInput = "";
    updateDisplay();

    timer = 10;
    document.getElementById("timer").textContent = timer;

    const q = questions[currentQuestion];
    document.getElementById("question").textContent =
        `${q.a} × ${q.b} = ?`;
          clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;
        if (timer === 0) {
            clearInterval(timerInterval);
            currentQuestion++;
            nextQuestion();
        }
    }, 1000);
}


function addNumber(num) {
    userInput += num;
    updateDisplay();
}

function clearInput() {
    userInput = "";
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("display").textContent = userInput;
}

function submitAnswer() {
    clearInterval(timerInterval);

    const q = questions[currentQuestion];
    if (parseInt(userInput) === q.answer) {
        correctAnswers++;
        document.getElementById("score").textContent = correctAnswers;
    }

    currentQuestion++;
    nextQuestion();
}

function endGame() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("finalScore").textContent = correctAnswers;
}

startGame();
