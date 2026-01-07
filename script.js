let questions = [];
let currentQuestion = 0;
let correctAnswers = 0;
let timer = 7;
let timerInterval;
let userInput = "";
let isPaused = false;


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
    isPaused = false;
    document.getElementById("score").textContent = 0;
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playPauseLabel = document.getElementById("playPauseLabel");
    if (playPauseBtn) {
        playPauseBtn.textContent = '⏸';
    }
    if (playPauseLabel) {
        playPauseLabel.textContent = 'Pause';
    }
    
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
    if (isPaused) return;
    userInput += num;
    updateDisplay();
}

function clearInput() {
    if (isPaused) return;
    userInput = "";
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("display").textContent = userInput;
}

function submitAnswer() {
    if (isPaused) return;
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
    clearInterval(timerInterval);
    isPaused = false;
    document.getElementById("game").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("finalScore").textContent = correctAnswers;
    
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playPauseLabel = document.getElementById("playPauseLabel");
    if (playPauseBtn) {
        playPauseBtn.textContent = '▶';
    }
    if (playPauseLabel) {
        playPauseLabel.textContent = 'Play';
    }
}

function toggleCalculatorButtons(disabled) {
    const buttons = document.querySelectorAll('.calculator button');
    buttons.forEach(button => {
        button.disabled = disabled;
        button.style.opacity = disabled ? '0.5' : '1';
        button.style.cursor = disabled ? 'not-allowed' : 'pointer';
    });
}

function togglePlayPause() {
    if (document.getElementById("game").classList.contains("hidden")) {
        // Game not started yet, start it
        startGame();
        toggleCalculatorButtons(false);
    } else if (isPaused) {
        // Resume game
        isPaused = false;
        toggleCalculatorButtons(false);
        timerInterval = setInterval(() => {
            timer--;
            document.getElementById("timer").textContent = timer;
            if (timer === 0) {
                clearInterval(timerInterval);
                currentQuestion++;
                nextQuestion();
            }
        }, 1000);
        document.getElementById("playPauseBtn").textContent = '⏸';
        document.getElementById("playPauseLabel").textContent = 'Pause';
    } else {
        // Pause game
        isPaused = true;
        toggleCalculatorButtons(true);
        clearInterval(timerInterval);
        document.getElementById("playPauseBtn").textContent = '▶';
        document.getElementById("playPauseLabel").textContent = 'Play';
    }
}
