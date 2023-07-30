let currentQuestion = 0;
let score = 0;
let questions = [];

const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const submitBtn = document.getElementById("submitBtn");
const resultElem = document.getElementById("result");

// Function to load the JSON data from a local file
function loadJSONFile(file, callback) {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", file, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        } else if (xhr.readyState === 4) {
            callback(null);
        }
    };
    xhr.send(null);
}

function fetchQuestions() {
    // Load the questions from the local JSON file
    loadJSONFile("vortoj.json", function (data) {
        if (data) {
            questions = JSON.parse(data);
            displayQuestion();
        } else {
            // If no data is found, show a message to the user to add questions manually
            questionElem.textContent = "Please add questions manually in the JSON format.";
        }
    });
}

function displayQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        questionElem.textContent = question.question;
        optionsElem.innerHTML = "";
        question.options.forEach((option) => {
            const li = document.createElement("li");
            li.textContent = option;
            li.addEventListener("click", () => checkAnswer(option));
            optionsElem.appendChild(li);
        });
    } else {
        showResult();
    }
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestion];
    if (selectedOption === question.answer) {
        score++;
    }
    currentQuestion++;
    displayQuestion();
}

function showResult() {
    questionElem.style.display = "none";
    optionsElem.style.display = "none";
    submitBtn.style.display = "none";
    resultElem.textContent = `You scored ${score} out of ${questions.length} questions correctly!`;
    resultElem.style.display = "block";
}

fetchQuestions();
submitBtn.addEventListener("click", () => checkAnswer());
