document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const timerContainer = document.getElementById("timer-container"); // Updated variable
    const timerDisplay = document.getElementById("timer");

    let currentQuestionIndex = 0;
    let timer;
    let score = 0;
    let secondsLeft = 100; // Declare secondsLeft variable

    startBtn.addEventListener("click", startQuiz);

    function startQuiz() {
        startBtn.style.display = "none";
        loadQuestion();
        startTimer();
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionContainer.innerHTML = `
                <h2>${currentQuestion.question}</h2>
                ${currentQuestion.options.map(option => `<button class="option-btn">${option}</button>`).join('')}
            `;

            // Add event listener for all buttons with class "option-btn"
            const optionButtons = document.querySelectorAll('.option-btn');
            optionButtons.forEach(button => {
                button.addEventListener('click', () => checkAnswer(button.textContent));
            });
        } else {
            endQuiz();
        }
    }

    function checkAnswer(selectedAnswer) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
            resultContainer.innerHTML = "Correct!";
            // Add 10 points for the correct answer
            score += 10;
        } else {
            resultContainer.innerHTML = "Incorrect!";
            // Subtract 10 seconds for an incorrect answer
            secondsLeft -= 10;
            if (secondsLeft < 0) {
                secondsLeft = 0; // Ensure secondsLeft doesn't go negative
            }
        }

        currentQuestionIndex++;
        // Clear result container after displaying the result
        setTimeout(() => {
            resultContainer.innerHTML = "";
            loadQuestion();
        }, 1000);
    }

    function startTimer() {
        timer = setInterval(function () {
            if (secondsLeft > 0) {
                secondsLeft--;
                updateTimerDisplay(secondsLeft);
            } else {
                endQuiz();
            }
        }, 1000);
    }

    function updateTimerDisplay(seconds) {
        // Display an empty string to hide "Time Remaining:" text
        timerDisplay.textContent = seconds > 0 ? `${seconds}s` : "";
    }

    function endQuiz() {
        clearInterval(timer);
        questionContainer.innerHTML = "Quiz Over!";
        resultContainer.innerHTML = `Your Score: ${score}`;
        // Add functionality to save initials and score

        // Hide the timer container
        timerContainer.style.display = "none";
    }
});
