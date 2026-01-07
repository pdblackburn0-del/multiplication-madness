// ===============================
// Game State
// ===============================
let questions = [];
let currentQuestion = 0;
let correctAnswers = 0;

let timer = 10;
let timerInterval = null;

let userInput = "";
let isPaused = false;
let currentQuestionText = "";

// ===============================
// Question Generation
// ===============================
function generateQuestions() {
    questions = [];
    for (let i = 0; i < 25; i++) {
        const a = Math.floor(Math.random() * 13);
        const b = Math.floor(Math.random() * 13);
        questions.push({ a, b, answer: a * b });
    }
}

// Build Progress Bar Function
function buildProgressBar() {
    const bar = document.getElementById("progressBar");
    bar.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
        const box = document.createElement("div");
        box.classList.add("progress-box");

        if (i === currentQuestion) {
            box.classList.add("current");
        }

        bar.appendChild(box);
    }
}

// ===============================
// Game Flow
// ===============================
function startGame() {
    generateQuestions();
    buildProgressBar();
    currentQuestion = 0;
    correctAnswers = 0;
    isPaused = false;

    // Fixed: Changed "score" to "finalScore" or remove if not needed yet
    const finalScoreElem = document.getElementById("finalScore");
    if (finalScoreElem) finalScoreElem.textContent = "0";

    document.getElementById("game").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");

    setPlayPauseUI(true);
    toggleCalculatorButtons(false);

    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    userInput = "";
    timer = 10;

    const q = questions[currentQuestion];
    currentQuestionText = `${q.a} × ${q.b} = `;

    updateAnswerBox();
    updateTimer();

    const boxes = document.querySelectorAll(".progress-box");
    boxes[currentQuestion].classList.add("current");

    clearInterval(timerInterval);
    timerInterval = setInterval(handleTimerTick, 1000);
}

function endGame() {
    clearInterval(timerInterval);

    document.getElementById("game").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("finalScore").textContent = correctAnswers;

    setPlayPauseUI(false);
    toggleCalculatorButtons(true);
}

// ===============================
// Timer Logic
// ===============================
function handleTimerTick() {
    if (isPaused) return;

    timer--;
    updateTimer();

    if (timer <= 0) {
        clearInterval(timerInterval);

        const boxes = document.querySelectorAll(".progress-box");
        boxes[currentQuestion].classList.add("wrong");
        boxes[currentQuestion].classList.remove("current");

        currentQuestion++;
        nextQuestion();
    }
}

function updateTimer() {
    document.getElementById("timer").textContent = timer;
}

// ===============================
// Input Handling
// ===============================
function addNumber(num) {
    if (isPaused) return;
    userInput += num;
    updateAnswerBox();
}

function clearInput() {
    if (isPaused) return;
    userInput = "";
    updateAnswerBox();
}

function submitAnswer() {
    if (isPaused) return;

    clearInterval(timerInterval);

    const q = questions[currentQuestion];
    const boxes = document.querySelectorAll(".progress-box");

    if (parseInt(userInput, 10) === q.answer) {
        correctAnswers++;
        boxes[currentQuestion].classList.add("correct");
    } else {
        boxes[currentQuestion].classList.add("wrong");
    }

    boxes[currentQuestion].classList.remove("current");

    currentQuestion++;
    nextQuestion();
}

// ===============================
// Answer Box Display
// ===============================
function updateAnswerBox() {
    document.getElementById("answerInput").value =
        currentQuestionText + userInput;
}

// ===============================
// Play / Pause
// ===============================
function togglePlayPause() {
    const gameHidden = document.getElementById("game").classList.contains("hidden");

    // Start game
    if (gameHidden) {
        startGame();
        return;
    }

    // Resume
    if (isPaused) {
        isPaused = false;
        toggleCalculatorButtons(false);
        setPlayPauseUI(true);
        return;
    }

    // Pause
    isPaused = true;
    toggleCalculatorButtons(true);
    setPlayPauseUI(false);
}

function setPlayPauseUI(isPlaying) {
    document.getElementById("playPauseBtn").textContent = isPlaying ? "⏸" : "▶";
    document.getElementById("playPauseLabel").textContent = isPlaying ? "Pause" : "Play";
}

// ===============================
// Calculator Buttons
// ===============================
function toggleCalculatorButtons(disabled) {
    const buttons = document.querySelectorAll(".calculator button");
    buttons.forEach(btn => {
        btn.disabled = disabled;
        btn.style.opacity = disabled ? "0.5" : "1";
        btn.style.cursor = disabled ? "not-allowed" : "pointer";
    });
}

// ===============================
// Keyboard Controls
// ===============================
document.addEventListener("keydown", (e) => {

    // Prevent page scroll on space
    if (e.code === "Space") e.preventDefault();

    // Ignore input if result screen visible
    if (!document.getElementById("result").classList.contains("hidden")) return;

    if (e.key >= "0" && e.key <= "9") {
        addNumber(e.key);
    }
    else if (e.key === "Enter") {
        submitAnswer();
    }
    else if (e.key === "Backspace") {
        clearInput();
    }
    else if (e.code === "Space") {
        togglePlayPause();
    }
    else if (e.key === "Escape" && !isPaused) {
        togglePlayPause();
    }
});
