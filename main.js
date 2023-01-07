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
const totalQuestions = document.getElementById('total-questions');

// declare question objects inside array
const quizQuestions = [
    {
        question: 'Which of the following is not a real eCommerce platform?',
        a: 'Shopify',
        b: 'WooCommerce',
        c: 'ShopCommerce',
        d: 'BigCommerce',
        correct: 'c'
    },
    {
        question: 'If Shopify is so good, why are Shopify developers necessary?',
        a: 'To save time on things like store setups and migrations',
        b: 'To extend the limited design options and functionalities of themes with custom code',
        c: 'To provide support with a deep understanding of how the platform works and what its limitations are',
        d: 'All the above',
        correct: 'd'
    },
    {
        question: 'Which of the following is true about Shopify developers?',
        a: 'They are paid extremely well',
        b: 'There is a high demand for them',
        c: 'They need to know web development, the platform itself, and the liquid template language',
        d: 'All the above',
        correct: 'd'
    },
    {
        question: 'When do Shopify developers tend to perform their best work?',
        a: 'Morning',
        b: 'Afternoon',
        c: 'Night',
        d: 'All the above',
        correct: 'd'
    },
    {
        question: 'Are websites essential to modern businesses',
        a: 'Yes',
        b: 'No',
        c: 'Is this a trick?',
        d: 'Websites are not the future',
        correct: 'a'
    },
]

// declare let variables
let currentQuestionIndex = 0;
let totalQuestionIndex = quizQuestions.length;
let lastQuestionIndex = quizQuestions.length - 1;
let score = 0;
let userAnswers = {};
let canProceed = null;


// create function to display quiz question and answers
function renderCurrentQuestion() {
    userAnswer();
    questionNumberDisplay.innerText = currentQuestionIndex + 1;
    totalQuestions.innerText = totalQuestionIndex;
    questionText.innerText = quizQuestions[currentQuestionIndex].question;
    answerA.innerText = quizQuestions[currentQuestionIndex].a;
    answerB.innerText = quizQuestions[currentQuestionIndex].b;
    answerC.innerText = quizQuestions[currentQuestionIndex].c;
    answerD.innerText = quizQuestions[currentQuestionIndex].d;
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

    if(num < lastQuestionIndex) {
        previousButton.classList.remove('hide');
        nextButton.classList.remove('hide');
        submitButton.classList.add('hide');
    }

    if(num === lastQuestionIndex) {
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
    userAnswers[currentQuestionIndex] = answer;
    console.log(answer)
    return answer;
}

// create function to remove any selections to start with clean quiz
function userAnswer() {
    answerOptions.forEach(answerOption => {
        if(answerOption.id === userAnswers[currentQuestionIndex]) {
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
function checkForAnswer() {
     if(!document.querySelector('input[type=radio]:checked')) {
        alert("Please select an option");
        canProceed = false;
    } else {
        canProceed = true;
    }
}

// event listeners for buttons
nextButton.addEventListener('click', () => {
    checkForAnswer();
    getAnswer();
    if(canProceed) {
        currentQuestionIndex++;
    } 
    renderCurrentQuestion();
    toggleButtons(currentQuestionIndex);
    console.log(currentQuestionIndex)

})

previousButton.addEventListener('click', () => {
    getAnswer();
    currentQuestionIndex--;
    renderCurrentQuestion();
    toggleButtons(currentQuestionIndex);
})

submitButton.addEventListener('click', () => {
    checkForAnswer();
    getAnswer();
    if(canProceed) {
        calcScore();
        quiz.innerHTML = `<h4>You answered ${score} out of ${quizQuestions.length} correct!</h4> <button class="reload-btn" onClick="location.reload()">Reload</button>`
    }
})