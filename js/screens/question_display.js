let createQuestionDisplay = (value, question, answer) => {
    return `
        <div class="question-display">
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
        </div>
    `;
} 