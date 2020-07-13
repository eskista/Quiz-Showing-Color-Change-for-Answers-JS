var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", StartGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function StartGame() {
  // first hide the start button when it is clicked
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  // second show questions (they have a hide class in html, remove the hide)
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  //  reset fucntion to remove previous answers when next is clicked
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  // looping each answer option to choose from
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      //  add data attribute into our data element
      button.dataset.correct = answer.correct;
    }
    //  adding eventlistner to button element if we only have the correct answer
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
// function to remove answered answers everytime we click next questions

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  // loop through all the children for our button elements
  while (answerButtonsElement.firstChild) {
    // if there is a child in the button Element, we need to remove it
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

//  selecting answer options
function selectAnswer(event) {
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  // if we have more questions than the question we are currently at, show next button
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
    // if the current question is the last one, show start the quiz again
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

var questions = [
  {
    question: "How old are you?",
    answers: [
      { text: "56", correct: true },
      { text: "37", correct: false },
    ],
  },
  {
    question: "What is your lucky number?",
    answers: [
      { text: "56", correct: true },
      { text: "37", correct: false },
    ],
  },

  {
    question: "Can you tell us how kind you are?",
    answers: [
      { text: "Very kind", correct: false },
      { text: "Not bad at it", correct: true },
    ],
  },

  {
    question: "Are you going to be with us?",
    answers: [
      { text: "Definitely", correct: false },
      { text: "Sure, but after work", correct: true },
    ],
  },
];
