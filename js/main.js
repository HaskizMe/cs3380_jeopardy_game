let main = document.getElementById("main");
let currentScore = 0;

// let createJeopardyBoard = () => {
//     let board = document.createElement('div');
//     board.className = 'jeopardy-board';
//     board.style.transition = 'all 0.3s ease-in-out';
    
//     // Create header row with categories
//     let headerRow = document.createElement('div');
//     headerRow.className = 'category-row';
    
//     jeopardyBoard.categories.forEach(category => {
//         let categoryCell = document.createElement('div');
//         categoryCell.className = 'category-cell';
//         categoryCell.textContent = category;
//         headerRow.appendChild(categoryCell);
//     });
//     board.appendChild(headerRow);
    
//     // Create question cells
//     for (let value = 200; value <= 1000; value += 200) {
//         let row = document.createElement('div');
//         row.className = 'question-row';
        
//         jeopardyBoard.categories.forEach(category => {
//             let cell = document.createElement('div');
//             cell.className = 'question-cell';
//             cell.textContent = '$' + value;
            
//             // Store the question data as attributes
//             let questionData = jeopardyBoard.questions[category].find(q => q.value === value);
//             cell.dataset.question = questionData.question;
//             cell.dataset.answer = questionData.answer;
//             cell.dataset.value = value;
//             cell.dataset.category = category;
            
//             // Add click handler
//             cell.addEventListener('click', handleQuestionClick);
            
//             row.appendChild(cell);
//         });
//         board.appendChild(row);
//     }
    
//     // Add score display
//     let scoreDisplay = document.createElement('div');
//     scoreDisplay.id = 'score-display';
//     scoreDisplay.className = 'score-display';
//     scoreDisplay.textContent = 'Score: $' + currentScore;
//     board.appendChild(scoreDisplay);

//     let resetButton = document.createElement('div');
//     resetButton.id = 'reset-button';
//     resetButton.className = 'reset-button';
//     resetButton.textContent = 'Reset Game';
//     resetButton.addEventListener('click', resetGame);
//     board.appendChild(resetButton);
    
//     return board;
// };

let handleQuestionClick = (event) => {
    let cell = event.target;
    
    // If the question has already been answered, do nothing
    if (cell.classList.contains('answered')) {
        return;
    }
    
    // Show the question
    let value = parseInt(cell.dataset.value);
    let question = cell.dataset.question;
    let answer = cell.dataset.answer;
    
    // Create question display
    let questionDisplay = document.createElement('div');
    questionDisplay.className = 'question-display';
    questionDisplay.innerHTML = `
        <div class="question-content">
            <h2>$${value}</h2>
            <p>${question}</p>
            <button class="show-answer-btn">Show Answer</button>
            <div class="answer-content" style="display: none;">
                <p>${answer}</p>
                <button class="correct-btn">Correct</button>
                <button class="incorrect-btn">Incorrect</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    let showAnswerBtn = questionDisplay.querySelector('.show-answer-btn');
    let answerContent = questionDisplay.querySelector('.answer-content');
    let correctBtn = questionDisplay.querySelector('.correct-btn');
    let incorrectBtn = questionDisplay.querySelector('.incorrect-btn');
    
    showAnswerBtn.addEventListener('click', () => {
        answerContent.style.display = 'block';
        showAnswerBtn.style.display = 'none';
    });
    
    correctBtn.addEventListener('click', () => {
        currentScore += value;
        updateScore();
        closeQuestion();
    });
    
    incorrectBtn.addEventListener('click', () => {
        currentScore -= value;
        updateScore();
        closeQuestion();
    });
    
    // Add question display to the page
    document.body.appendChild(questionDisplay);
    
    function closeQuestion() {
        cell.classList.add('answered');
        cell.textContent = '✓';
        questionDisplay.remove();
    }
};

let resetGame = () => {
    // Reset score
    currentScore = 0;
    
    // Remove all existing content
    main.innerHTML = '';
    
    // Create a fresh board
    let board = createJeopardyBoard();
    
    // Add the new board to the page
    main.appendChild(board);
    
    // Trigger reflow
    board.offsetHeight;
    
    // Add transition properties
    board.style.transition = 'all 0.3s ease-in-out';
    
    // Show the board with animation
    setTimeout(() => {
        board.style.opacity = '1';
        board.style.transform = 'scale(1)';
    }, 50);
};


let updateScore = () => {
    let scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = 'Score: $' + currentScore;
};

let startGame = () => {
    console.log('start_game');
    main.innerHTML = '';
    main.innerHTML = createGameBoard();
};

let initialize = () => {
   // main.innerHTML = createHomePage();
    main.innerHTML = createHomePage();

    let start_btn = document.getElementById("start-game");
    start_btn.onclick = startGame;
    // main.innerHTML = '';
    // main.appendChild(createJeopardyBoard());
};

initialize();