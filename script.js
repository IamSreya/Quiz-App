document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");

    const addQuestionContainer = document.getElementById("add-question-container");
    const newQuestionInput = document.getElementById("new-question");
    const choice1Input = document.getElementById("choice-1");
    const choice2Input = document.getElementById("choice-2");
    const choice3Input = document.getElementById("choice-3");
    const choice4Input = document.getElementById("choice-4");
    const correctAnswerInput = document.getElementById("correct-answer");
    const addQuestionBtn = document.getElementById("add-question-btn");

    const questions = [
        {
            question: "What is the capital of India?",
            choices: ["Paris", "New Delhi", "Madrid", "Berlin"],
            answer: "New Delhi",
        },
        {
            question: "Who is the author of 'Hamlet'?",
            choices: ["Charles Dickens", "William Shakespeare", "Rabindranath Tagore", "Shakti Roy"],
            answer: "William Shakespeare",
        },
        {
            question: "Which planet has the most moons?",
            choices: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Saturn",
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });
    restartBtn.addEventListener('click', restartQuiz);
    addQuestionBtn.addEventListener('click', addNewQuestion);

    function startQuiz() {
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add('hidden');
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "";
        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.classList.add('choice-item');
            li.addEventListener('click', () => selectAnswer(choice, li));
            choicesList.appendChild(li);
        });
    }

    function selectAnswer(choice, li) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (choice === correctAnswer) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('incorrect');
            const choiceItems = choicesList.querySelectorAll('li');
            choiceItems.forEach(item => {
                if (item.textContent === correctAnswer) {
                    item.classList.add('correct');
                }
            });
        }
        const choiceItems = choicesList.querySelectorAll('li');
        choiceItems.forEach(item => item.classList.add('disabled'));
        nextBtn.classList.remove("hidden");
    }

    function showResult() {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }

    function restartQuiz() {
        startBtn.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.add('hidden');
        currentQuestionIndex = 0;
        score = 0;
    }

    function addNewQuestion() {
        const newQuestion = newQuestionInput.value.trim();
        const choice1 = choice1Input.value.trim();
        const choice2 = choice2Input.value.trim();
        const choice3 = choice3Input.value.trim();
        const choice4 = choice4Input.value.trim();
        const correctAnswer = correctAnswerInput.value.trim();

        if (!newQuestion || !choice1 || !choice2 || !choice3 || !choice4 || !correctAnswer) {
            alert("Please fill in all fields.");
            return;
        }

        const newQuestionObj = {
            question: newQuestion,
            choices: [choice1, choice2, choice3, choice4],
            answer: correctAnswer,
        };
        questions.push(newQuestionObj);

        newQuestionInput.value = '';
        choice1Input.value = '';
        choice2Input.value = '';
        choice3Input.value = '';
        choice4Input.value = '';
        correctAnswerInput.value = '';

        alert("New question added successfully!");
    }
});
