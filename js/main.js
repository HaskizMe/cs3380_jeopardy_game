let main = document.getElementById("main");
let currentScore = 0;

let updateScore = () => {
    let scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = 'Score: $' + currentScore;
};

let startGame = (questions) => {
    main.innerHTML = createGameBoard(questions);

    // After the board is rendered, attach event listeners
    const popup = document.getElementById("question-popup");
    const popupQuestion = document.getElementById("popup-question");
    const correctBtn = document.getElementById("correct-btn");
    const incorrectBtn = document.getElementById("incorrect-btn");
    const scoreDisplay = document.getElementById("score-display");
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.onclick = () => {
            console.log("Clicked");
            popup.classList.remove("show");
        };
    }

    document.querySelectorAll(".question-cell").forEach(cell => {
        cell.addEventListener("click", () => {
            const question = cell.getAttribute("data-question");
            const value = parseInt(cell.getAttribute("data-value"));

            popup.classList.add("show");
            popupQuestion.innerText = question;

            correctBtn.onclick = () => {
                currentScore += value;
                updateScore();
                cell.textContent = "✓";
                cell.classList.add("answered");
                popup.classList.remove("show");
            };

            incorrectBtn.onclick = () => {
                currentScore -= value;
                updateScore();
                cell.textContent = "X";
                cell.classList.add("answered");
                popup.classList.remove("show");
            };
        });
    });

    document.getElementById("reset-button").onclick = () => location.reload();
};

async function loadQuestion() {
    main.innerHTML = loaderScreen();

    let data = await fetchQuestionsWithDelay();
    console.log(data);
    startGame(data);
}

let initialize = () => {
    main.innerHTML = createHomePage();

    let start_btn = document.getElementById("start-game");
    start_btn.onclick = loadQuestion;
};

initialize();