const quiz = document.getElementById('quiz-question');
const answerOptions = document.querySelectorAll('.answer');
const questionText = document.getElementById('question');
const answerA = document.getElementById('answer-a');
const answerB = document.getElementById('answer-b');
const answerC = document.getElementById('answer-c');
const answerD = document.getElementById('answer-d');
const nextButton = document.getElementById('next-btn');
const previousButton = document.getElementById('previous-btn');
const questionNumberDisplay = document.getElementById('question-number');


const quizQuestions = [
    {
        number: 1,
        question: 'Which of the following is not a real eCommerce platform?',
        a: 'Shopify',
        b: 'WooCommerce',
        c: 'ShopCommerce',
        d: 'BigCommerce',
        correct: 'c'
    },
    {
        number: 2,
        question: 'If Shopify is so good, why are Shopify developers necessary?',
        a: 'To save time on things like store setups and migrations',
        b: 'To extend the limited design options and functionalities of themes with custom code',
        c: 'To provide support with a deep understanding of how the platform works and what its limitations are',
        d: 'All the above',
        correct: 'd'
    },
    {
        number: 3,
        question: 'Which of the following is true about Shopify developers?',
        a: 'They are paid extremely well',
        b: 'There is a high demand for them',
        c: 'They need to know web development, the platform itself, and the liquid template language',
        d: 'All the above',
        correct: 'd'
    },
]

let currentQuestionNumber = 0;
let score = 0;
let currentNumber = 1;
let answerStorage = {};

function startQuiz() {
    // removeSelections()

    questionNumberDisplay.innerText = currentNumber;

    //declaring variable to access the question/answers from the quizQuestions array of objects. quizQuestions with the current question number index starting at 0
    const currentQuestion = quizQuestions[currentQuestionNumber];
    //use variable from above to access question number/questions/answers and use innerText to display on DOM
    questionNumberDisplay.innerText = currentQuestion.number;
    questionText.innerText = currentQuestion.question;
    answerA.innerText = currentQuestion.a;
    answerB.innerText = currentQuestion.b;
    answerC.innerText = currentQuestion.c;
    answerD.innerText = currentQuestion.d;
}

window.onload = startQuiz();

//create function to remove any selections to start with clean quiz
function removeSelections() {
    answerOptions.forEach(answerOption => answerOption.checked = false);
}

//create function to determine selected answer
function getAnswer() {
    let answer;
    answerOptions.forEach(answerOption => {
        if(answerOption.checked) {
            answer = answerOption.id
            console.log(`this is answer id: ${answerOption.id}`)
        }
    })
    
    answerStorage[currentQuestionNumber] = answer;
    return answer;
}

nextButton.addEventListener('click', () => {
    console.log(answerStorage);
    const answer = getAnswer();
    //logging outputs for testing
    console.log(quizQuestions[currentQuestionNumber].correct);

    if(answer) {
        if(answer === quizQuestions[currentQuestionNumber].correct) {
            score++;
        }
        currentQuestionNumber++;
        
        if(currentQuestionNumber < quizQuestions.length) {
            startQuiz();
            // adding the remove selections function here instead of start quiz. Might need to move back to star quiz function
            removeSelections();
        } else {
            nextButton.classList.add('hide');
            previousButton.classList.add('hide');
            quiz.innerHTML = `<h4>You answered ${score} out of ${quizQuestions.length} correct!</h4> <button class="reload-btn" onClick="location.reload()">Reload</button>`
        }
    }

    const num = parseInt(questionNumberDisplay.innerText);
    if(num > 1) {
        previousButton.classList.remove('hide');
    }
})

previousButton.addEventListener('click', () => {
    currentQuestionNumber--;
    startQuiz();

    const num = parseInt(questionNumberDisplay.innerText);
    if(num === 1) {
        previousButton.classList.add('hide');
    }

    // for (let i = 0; i < answerOptions.length; i++) {
    //     console.log(answerOptions[i].value)
    //     if(answerOptions[i].value === answerStorage[currentQuestionNumber]) {
    //         answerOptions[i].checked = true;
            
    //     }
    // }

    answerOptions.forEach(answerOption => {
        if(answerOption.id === answerStorage[currentQuestionNumber]) {
           answerOption.checked = true;
        }
    })
    
    console.log(`This is answer storage at ${currentQuestionNumber}: ${answerStorage[currentQuestionNumber]}`)
})