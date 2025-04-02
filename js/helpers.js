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
                reject(new Error(`Request failed. Status: ${xhr.status}`));
            }
        };

        xhr.onerror = () => reject(new Error("Network error"));

        xhr.send();
    });
}
async function fetchQuestionsWithDelay() {
    for (let i = 0; i < jeopardyQuestions.categories.length; i++) {
        const cat = jeopardyQuestions.categories[i];
        const url = `https://opentdb.com/api.php?amount=5&category=${cat.id}&type=multiple`;

        try {
            const data = await fetchPolyfill(url).then(res => res.json());

            jeopardyQuestions.questions[cat.name] = data.results.map((q, index) => ({
                question: q.question,
                answer: q.correct_answer,
                value: (index + 1) * 200
            }));
        } catch (err) {
            console.error(`Error fetching category ${cat.name}:`, err);
        }

        // Wait 5 seconds before next call (unless it's the last one)
        if (i < jeopardyQuestions.categories.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    return jeopardyQuestions;
}