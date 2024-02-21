document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const timerContainer = document.getElementById("timer-container");
    const timerDisplay = document.getElementById("timer");
    var initialsLabel = document.getElementById("initials-label");
    var initialsInput = document.getElementById("initials");
    var saveScoreButton = document.getElementById("save-score");



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
        resultContainer.innerHTML = `Your Score is: ${score}`;


        console.log("Your score is: " + score);
    
        // Add functionality to save initials and score
    
        // Hide the timer container
        timerContainer.style.display = "none";
    
        // Display the input for entering initials and the "Save Score" button
        initialsInput.style.display = "block";
        saveScoreButton.style.display = "block";
    
        // Prompt the user to enter initials
        var userInitials = prompt("Enter your initials:");
    
        // Check if the user entered initials
        if (userInitials !== null && userInitials.trim() !== "") {
            // Save the user's initials and score (you can modify this part based on your needs)
            var savedScores = JSON.parse(localStorage.getItem("scores")) || [];
            savedScores.push({ initials: userInitials, score: score });
            localStorage.setItem("scores", JSON.stringify(savedScores));
    
            // Display a confirmation message
            alert("Score saved successfully!");
        } else {
            // Handle the case where the user didn't enter initials
            alert("Please enter your initials to save the score.");
        }
    }
    


});





