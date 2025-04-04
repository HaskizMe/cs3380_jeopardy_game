// Custom polyfill function for fetching data
function fetchPolyfill(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve({ json: () => Promise.resolve(JSON.parse(xhr.responseText)) });
                } catch (err) {
                    reject(err);
                }
            } else {
                reject(new Error(`Polyfill request failed. Status: ${xhr.status}`));
            }
        };

        xhr.onerror = () => reject(new Error("Network error"));

        xhr.send();
    });
}

// I use this to shuffle the answers for each question
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Giving the difficulty a numeric value to sort them
const difficulty = { 
    easy: 1, 
    medium: 2, 
    hard: 3 
};

// I use this to fetch the questions every 5 seconds 
async function fetchQuestionsWithDelay() {

    // Loop through the categories that I defined in the questions.js file
    for (let i = 0; i < jeopardyQuestions.categories.length; i++) {
        // Grabbing category id to send api request
        const cat = jeopardyQuestions.categories[i];
        const url = `https://opentdb.com/api.php?amount=5&category=${cat.id}&type=multiple`;

        try {
            // Send request to get questions
            const data = await fetchPolyfill(url).then(res => res.json());

            // Sort by difficulty
            const sortedResults = data.results.sort((a, b) => {
                return difficulty[a.difficulty] - difficulty[b.difficulty];
            });

            // Assign values in increasing order
            jeopardyQuestions.questions[cat.name] = sortedResults.map((ques, index) => ({
                question: ques.question,
                answer: ques.correct_answer,
                options: shuffle([...ques.incorrect_answers, ques.correct_answer]),
                value: (index + 1) * 200
            }));
        } catch (err) {
            console.error(`Error fetching category ${cat.name}:`, err);
        }

        // I add a delay of 5 seconds between each category fetch
        if (i < jeopardyQuestions.categories.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    return jeopardyQuestions;
}