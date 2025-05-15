let Level = 0;
const questions = [
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "What is the capital of Quezon Province?",
    answers: ["Lucena", "Sariaya", "Lucban", "Tayabas"],
    correct: 0,
  },
  {
    question: "What is the meaning of WWW?",
    answers: [
      "World Wide Web",
      "World Width Wide",
      "World Wild Web",
      "Whole World Web",
    ],
    correct: 0,
  },
];

window.onload = function () {
  showQuestion();
};
// to show question
function showQuestion() {
  // Para matawag yung level
  const question = questions[Level];
  document.getElementById("question-text").innerText = question.question;

  // to show button answers para sa iba iba level
  const buttons = Array.from(document.getElementById("answers").children);
  buttons.forEach((button, index) => {
    button.innerText = question.answers[index];
  });
}

function selectAnswer(answerIndex) {
  const question = questions[Level];
  if (answerIndex === question.correct) {
    Level++;
    if (Level < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  } else {
    alert("Wrong answer! Try again.");
  }
}

function endGame() {
  document.getElementById("level-page").style.display = "none";
  document.getElementById("end-page").style.display = "block";
}

function restartGame() {
  Level = 0;
  document.getElementById("end-page").style.display = "none";
  document.getElementById("level-page").style.display = "block";
  showQuestion();
}
