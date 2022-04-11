const questionNumber = document.getElementById('question-number');
const nextQuestionButton = document.getElementById('next-question');

let currentQuestionNumber = 1;

const advanceRound = () => currentQuestionNumber++;

//active question function to remove active-question css class and apply to correct question
const activeQuestion = () => {
    const questionBodies = document.getElementsByClassName('question-container');
    for (const questionBody of questionBodies) {
        questionBody.classList.remove('active-question');
        
    }
}

nextQuestionButton.addEventListener('click', () => {
    //increase question number
    if (questionNumber.innerText < 3) {
        advanceRound();
    }
    //display the new question number
    questionNumber.innerText = currentQuestionNumber;

    //remove active-question css class
    activeQuestion()
})