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
// Instructions Functions
// ===============================
function showInstructions() {
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("instructionsScreen").classList.remove("hidden");
}

function hideInstructions() {
    document.getElementById("instructionsScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");
}

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

    // Hide start and instructions screens, show game
    const startScreen = document.getElementById("startScreen");
    const instructionsScreen = document.getElementById("instructionsScreen");
    if (startScreen) startScreen.classList.add("hidden");
    if (instructionsScreen) instructionsScreen.classList.add("hidden");
    
    document.getElementById("game").classList.remove("hidden");

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
    
    // Show start screen again
    const startScreen = document.getElementById("startScreen");
    if (startScreen) startScreen.classList.remove("hidden");

    setPlayPauseUI(false);
    toggleCalculatorButtons(true);

    // Show Bootstrap modal with score
    document.getElementById("modalScore").textContent = correctAnswers;
    new bootstrap.Modal(document.getElementById("quizEndModal")).show();
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

    // Ignore input if game is not visible
    const gameElement = document.getElementById("game");
    if (!gameElement || gameElement.classList.contains("hidden")) return;

    // Handle both main keyboard numbers (0-9) and numpad numbers (Numpad0-Numpad9)
    if ((e.key >= "0" && e.key <= "9") || (e.code >= "Numpad0" && e.code <= "Numpad9")) {
        // Don't allow input when paused
        if (isPaused) return;
        
        // Extract the number from the key or code
        const number = e.key >= "0" && e.key <= "9" ? e.key : e.code.replace("Numpad", "");
        addNumber(number);
    }
    else if (e.key === "Enter" || e.code === "NumpadEnter") {
        // Don't allow submit when paused
        if (isPaused) return;
        submitAnswer();
    }
    else if (e.key === "Backspace" || e.key === "Delete" || e.code === "NumpadDecimal") {
        // Don't allow clearing when paused
        if (isPaused) return;
        clearInput();
    }
    else if (e.code === "Space" || e.key === "Escape") {
        // Both SPACE and ESC can pause/resume the game
        togglePlayPause();
    }
});
