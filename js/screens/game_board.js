// The main game board
let createGameBoard = (questions) => {
    return `
        <div class="jeopardy-board" style="transition: all 0.3s ease-in-out;">
            <div class="category-row">
                ${questions.categories.map(category => `
                    <div class="category-cell">${category.name}</div>
                `).join('')}
            </div>
            ${[200, 400, 600, 800, 1000].map(value => `
                <div class="question-row">
                    ${questions.categories.map(category => {
                        const q = questions.questions[category.name].find(q => q.value === value);
                        return `
                            <div class="question-cell"
                                data-question="${q.question.replace(/"/g, '&quot;')}"
                                data-answer="${q.answer.replace(/"/g, '&quot;')}"
                                data-options='${JSON.stringify(q.options).replace(/"/g, '&quot;')}'
                                data-value="${value}"
                                data-category="${category.name}">
                                $${value}
                            </div>
                        `;
                    }).join('')}
                </div>
            `).join('')}
            
            <div id="score-display" class="score-display">Score: $${currentScore}</div>
            <div id="reset-button" class="reset-button">Play Again</div>

            <div id="question-popup" class="popup hidden">
                <div id="popup-content">
                    <div class="popup-header">
                        <button id="back-btn" class="back-button">←</button>
                    </div>
                    <div id="popup-question"></div>
                    <div id="popup-options" class="popup-options"></div>

                    <button id="show-answer-btn">Show Answer</button>
                    <div id="answer" class="answer hidden"></div>

                    <div id="result-buttons" class="hidden">
                        <button id="correct-btn">Correct</button>
                        <button id="incorrect-btn">Incorrect</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};