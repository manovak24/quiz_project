const questionNumber = document.getElementById('question-number');
const nextQuestionButton = document.getElementById('next-question');

let currentQuestionNumber = 1;

const advanceRound = () => currentQuestionNumber++;

nextQuestionButton.addEventListener('click', () => {
    //increase question number
    if (questionNumber.innerText < 3) {
        advanceRound();
    }
    //display the new question number
    questionNumber.innerText = currentQuestionNumber;
})