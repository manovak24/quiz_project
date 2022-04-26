// declare const variables
const quiz = document.getElementById('quiz-question');
const answerOptions = document.querySelectorAll('.answer');
const questionText = document.getElementById('question');
const answerA = document.getElementById('answer-a');
const answerB = document.getElementById('answer-b');
const answerC = document.getElementById('answer-c');
const answerD = document.getElementById('answer-d');
const nextButton = document.getElementById('next-btn');
const previousButton = document.getElementById('previous-btn');
const submitButton = document.getElementById('submit-btn');
const questionNumberDisplay = document.getElementById('question-number');

// declare question objects inside array
const quizQuestions = [
    {
        storageNum: 0,
        number: 1,
        question: 'Which of the following is not a real eCommerce platform?',
        a: 'Shopify',
        b: 'WooCommerce',
        c: 'ShopCommerce',
        d: 'BigCommerce',
        correct: 'c'
    },
    {
        storageNum: 1,
        number: 2,
        question: 'If Shopify is so good, why are Shopify developers necessary?',
        a: 'To save time on things like store setups and migrations',
        b: 'To extend the limited design options and functionalities of themes with custom code',
        c: 'To provide support with a deep understanding of how the platform works and what its limitations are',
        d: 'All the above',
        correct: 'd'
    },
    {
        storageNum: 2,
        number: 3,
        question: 'Which of the following is true about Shopify developers?',
        a: 'They are paid extremely well',
        b: 'There is a high demand for them',
        c: 'They need to know web development, the platform itself, and the liquid template language',
        d: 'All the above',
        correct: 'd'
    },
]

// declare let variables
let currentQuestionNumber = 0;
let score = 0;
let currentNumber = 1;
let userAnswers = {};
let disableButtons = null;

// create function to display quiz question and answers
function renderCurrentQuestion() {
    userAnswer();
    questionNumberDisplay.innerText = currentNumber;
    // declaring variable to access the question/answers from the quizQuestions array of objects. quizQuestions with the current question number index starting at 0
    const currentQuestion = quizQuestions[currentQuestionNumber];
    // use variable from above to access question number/questions/answers and use innerText to display on DOM
    questionNumberDisplay.innerText = currentQuestion.number;
    questionText.innerText = currentQuestion.question;
    answerA.innerText = currentQuestion.a;
    answerB.innerText = currentQuestion.b;
    answerC.innerText = currentQuestion.c;
    answerD.innerText = currentQuestion.d;
}

// create window onload to start quiz
window.onload = renderCurrentQuestion();

// create function to toggle the quiz buttons
function toggleButtons(num) {
    if(num === 0) {
        previousButton.classList.add('hide');
        nextButton.classList.remove('hide');
        submitButton.classList.add('hide');
    }

    if(num === 1) {
        previousButton.classList.remove('hide');
        nextButton.classList.remove('hide');
        submitButton.classList.add('hide');
    }

    if(num === 2) {
        submitButton.classList.remove('hide');
        nextButton.classList.add('hide')
    }
}

// create function to determine selected answer
function getAnswer() {
    // could simplify this by using the below query selector to get the id of the selected answer and set it to the variable answer istead
    // let test = document.querySelector('input[type=radio]:checked').id
    // console.log(`This is the query selector test ${test}`)
    let answer;
    answerOptions.forEach(answerOption => {
        if(answerOption.checked) {
            answer = answerOption.id
        }
    })
    userAnswers[currentQuestionNumber] = answer;
    console.log(answer)
    return answer;
}

// create function to remove any selections to start with clean quiz
function userAnswer() {
    answerOptions.forEach(answerOption => {
        if(answerOption.id === userAnswers[currentQuestionNumber]) {
            answerOption.checked = true;
         } else {
            answerOption.checked = false
         }
    });
}

// create function to calculate score
function calcScore() {
    for(const key in userAnswers) {
        let keyVal = parseInt(key);
        if(userAnswers[keyVal] === quizQuestions[keyVal].correct){
            score++
        }
    }
}

// function to display alert if no answer selected
function displayAlert() {
     if(!document.querySelector('input[type=radio]:checked')) {
        alert("Please select an option");
        disableButtons = false;
    } else {
        disableButtons = true;
    }
}

// event listeners for buttons
nextButton.addEventListener('click', () => {
    displayAlert();
    getAnswer();
    if(disableButtons) {
        currentQuestionNumber++;
    } 
    renderCurrentQuestion();
    toggleButtons(currentQuestionNumber);
})

previousButton.addEventListener('click', () => {
    getAnswer();
    currentQuestionNumber--;
    renderCurrentQuestion();
    toggleButtons(currentQuestionNumber);
})

submitButton.addEventListener('click', () => {
    displayAlert();
    getAnswer();
    if(disableButtons) {
        calcScore();
        quiz.innerHTML = `<h4>You answered ${score} out of ${quizQuestions.length} correct!</h4> <button class="reload-btn" onClick="location.reload()">Reload</button>`
    }
})