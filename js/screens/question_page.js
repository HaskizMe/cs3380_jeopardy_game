

let createQuestionPage = (questObj, showNext) => {

    let ansObj = questObj.a;
    let quest = questObj.q;
    console.log(quest, ansObj);
    if (ansObj.length > 8) ansObj = ansObj.slice(0, 8);

    return `
    <div id="question-page">
        <div id="question">
            ${quest}
        </div>
        <div id="answers">
            ${ansObj.map(obj => {
                return `
                    <div class="answer-box not-answered">
                        <div class="answer">
                            ${obj.a}
                        </div>
                        <div class="num-pts">
                            ${obj.num}
                        </div>
                    </div>
                `
            }).join("")}
        </div>
        <div id="btn-div">
            <div id="end-btn" class="btn">
                End Game
            </div>
            ${
                showNext ? 
                `
            <div id="next-btn" class="btn">
                Next Question
            </div>` : ""
            }
        </div>
    </div>
    `;
}