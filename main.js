const quizQuestion = document.getElementById('quiz-question');
const answerOptions = document.querySelectorAll('.answer');
const questionText = document.getElementById('question');
const answerA = document.getElementById('answer-a');
const answerB = document.getElementById('answer-b');
const answerC = document.getElementById('answer-c');
const answerD = document.getElementById('answer-d');
const nextButton = document.getElementById('next-btn');


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
    }
]

let currentQuestionNumber = 0;
let score = 0;

startQuiz()

function startQuiz() {
    removeSelections()

    //declaring variable to access the question/answers from the quizQuestions array of objects. quizQuestions with the current question number index starting at 0
    const currentQuestion = quizQuestions[currentQuestionNumber];
    //use variable from above to access questions/answers and use innerText to display on DOM
    questionText.innerText = currentQuestion.question;
    answerA.innerText = currentQuestion.a;
    answerB.innerText = currentQuestion.b;
    answerC.innerText = currentQuestion.c;
    answerD.innerText = currentQuestion.d;
}

//create function to remove any selections to start with clean quiz
function removeSelections() {
    answerOptions.forEach(answerOption => answerOption.checked = false);
}

//creaet function to determine selected answer
function getAnswer() {
    let answer;
    answerOptions.forEach(answerOption => {
        if(answerOption.checked) {
            answer = answerOption.id
        }
    })
    return answer;
}

nextButton.addEventListener('click', () => {
    const answer = getAnswer();
    console.log(answer)
    console.log(quizQuestions[currentQuestionNumber].correct)
    if(answer) {
        if(answer === quizQuestions[currentQuestionNumber].correct) {
            score++;
        }
        currentQuestionNumber++

        if(currentQuestionNumber < quizQuestions.length) {
            startQuiz();
        } else {
            quizQuestion.innerHTML = `<h2>You answered ${score} out of ${quizQuestions.length}</h2> <button onClick="location.reload()">Reload</button>`
        }
    }
})

