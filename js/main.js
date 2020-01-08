let main = document.getElementById("main");

const numQ = 5;

let questions_to_use;

let showEndScreen = () => {
    main.innerHTML = "";
    main.innerHTML = createEndPage();

    let restart_btn = document.getElementById("play-again");
    restart_btn.addEventListener("click", () => {
        startGame();
    })
}

let nextQuestion = () => {

    main.innerHTML = "";

    let notDone = questions_to_use.length > 1;

    main.innerHTML = createQuestionPage(questions_to_use.pop(), notDone);

    let answerDivs = document.querySelectorAll(".answer-box");
    answerDivs.forEach(div => {
        div.addEventListener("click", (evt) => {
            let elmt = evt.target;
            while (!elmt.classList.contains("answer-box")) {
                elmt = elmt.parentElement;
            }
            elmt.classList.remove("not-answered");
        })
    });

    if (notDone) {
        let next_btn = document.getElementById("next-btn");
        next_btn.addEventListener("click", () => {
            nextQuestion();
        });
    }

    let endGameBtn = document.getElementById("end-btn");
    endGameBtn.addEventListener("click", () => {
        showEndScreen();
    })

}

let startGame = () => {
    questions_to_use = shuffleArray(questions).slice(0, numQ + 1);

    // console.log("want to start game", questions_to_use.pop());
    nextQuestion();
}


let initialize = () => {
    main.innerHTML = createHomePage();

    let start_btn = document.getElementById("start-game");
    start_btn.onclick = startGame;
}



initialize();
