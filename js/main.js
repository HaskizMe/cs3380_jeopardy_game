let main = document.getElementById("main");
let currentScore = 0;

// Updates the score during the game
let updateScore = () => {
    let scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = 'Score: $' + currentScore;
};

// Main start game function
let startGame = (questions) => {
    // This creates the jeopardy board and populates it with questions
    main.innerHTML = createGameBoard(questions);

    // Assign a bunch of variables to the elements in the game board
    const popup = document.getElementById("question-popup");
    const popupQuestion = document.getElementById("popup-question");
    const popupOptions = document.getElementById("popup-options");
    const answerDiv = document.getElementById("answer");
    const resultButtons = document.getElementById("result-buttons");
    const correctBtn = document.getElementById("correct-btn");
    const incorrectBtn = document.getElementById("incorrect-btn");
    const showAnswerBtn = document.getElementById("show-answer-btn");
    const backBtn = document.getElementById("back-btn");

    // This is the back button that closes the popup
    backBtn.onclick = () => {
        popup.classList.remove("show");
        answerDiv.classList.add("hidden");
        resultButtons.classList.add("hidden");
        popupOptions.innerHTML = '';
    };

    // Adds a way to do logic when a cell is clicked
    document.querySelectorAll(".question-cell").forEach(cell => {
        // This is the logic executed when a cell is clicked
        cell.addEventListener("click", () => {

            // Assign variables to the cell's data attributes
            const question = cell.getAttribute("data-question");
            const answer = cell.getAttribute("data-answer");
            const value = parseInt(cell.getAttribute("data-value"));
            const options = JSON.parse(cell.getAttribute("data-options"));
    
            // Show popup
            popup.classList.add("show");
            // Inject the question and on the popup
            popupQuestion.innerHTML = question;
            // I do this just to hide the answer until show answer is clicked
            answerDiv.textContent = '';
            answerDiv.classList.add("hidden");
            resultButtons.classList.add("hidden");
    
            // Inject multiple choice options into the popup
            popupOptions.innerHTML = options.map(opt => `
                <div class="option">${opt}</div>
            `).join('');
    
            // When the show answer button is clicked we show the answer
            showAnswerBtn.onclick = () => {
                answerDiv.textContent = `${answer}`;
                answerDiv.classList.remove("hidden");
                resultButtons.classList.remove("hidden");
            };
    
            // Logic when the user presses the correct button
            correctBtn.onclick = () => {
                currentScore += value;
                updateScore();
                cell.textContent = "✓";
                cell.classList.add("answered");
                popup.classList.remove("show");
            };
    
            // Logic when the user presses the incorrect button
            incorrectBtn.onclick = () => {
                currentScore -= value;
                updateScore();
                cell.textContent = "X";
                cell.classList.add("answered");
                popup.classList.remove("show");
            };
        });
    });

    // Just reload the page when we press the play again button
    document.getElementById("reset-button").onclick = () => {
        location.reload();
    }
};

// Grab the questions from the API
async function loadQuestions() {
    // Show the loader in the meantime
    main.innerHTML = loaderScreen();

    // Grab the data and pass that into our start game function
    let data = await fetchQuestionsWithDelay();
    startGame(data);
}

// Starter function
let initialize = () => {
    // Show the home page
    main.innerHTML = createHomePage();

    // When start button is clicked we will call the load questions function
    let start_btn = document.getElementById("start-game");
    start_btn.onclick = loadQuestions;
};

initialize();