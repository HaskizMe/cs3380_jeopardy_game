let createJeopardyBoard = () => {
    return `
        <div class="jeopardy-board" style="transition: all 0.3s ease-in-out;">
            <div class="category-row">
                ${jeopardyBoard.categories.map(category => `
                    <div class="category-cell">${category}</div>
                `).join('')}
            </div>
            ${[200, 400, 600, 800, 1000].map(value => `
                <div class="question-row">
                    ${jeopardyBoard.categories.map(category => {
                        let q = jeopardyBoard.questions[category].find(q => q.value === value);
                        return `
                            <div class="question-cell"
                                data-question="${q.question}"
                                data-answer="${q.answer}"
                                data-value="${value}"
                                data-category="${category}">
                                $${value}
                            </div>
                        `;
                    }).join('')}
                </div>
            `).join('')}
            <div id="score-display" class="score-display">Score: $${currentScore}</div>
            <div id="reset-button" class="reset-button">Reset Game</div>
        </div>
    `;

    // Inject HTML and attach event listeners
    main.innerHTML = html;

    document.querySelectorAll('.question-cell').forEach(cell => {
        cell.addEventListener('click', handleQuestionClick);
    });

    document.getElementById('reset-button').addEventListener('click', resetGame);
};