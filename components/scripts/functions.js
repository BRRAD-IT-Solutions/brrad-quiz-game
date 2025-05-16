let Level = 0;
let heroHealthPoints = 100;
let enemyHealthPoints = 100;
const heroStatus = document.getElementById("heroHealth");
const enemyStatus = document.getElementById("enemyHealth");
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
  {
    question: "complete this word N_gger",
    answers: [
      "nagger",
      "nogger",
      "nugger",
      "nigger",
    ],
    correct: 3,
  },
  {
    question: "Si Aj ba ay nagsasabun ng puwit?",
    answers: [
      "yes",
      "no",
      "maybe",
      "maybe",
    ],
    correct: 2,
  },
  {
    question: "Si jerra ba ay sasama sa ek?",
    answers: [
      "hindi",
      "ayaw",
      "hindi nyo ka vibe",
      "ayaw talaga ni ramzel",
    ],
    correct: 2,
  },
];

window.onload = function () {
  showQuestion();
  loadHealth();
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
  // enemy healthbar functions
  if (answerIndex === question.correct) {
    enemyHealthPoints -= 20;
    loadHealth();

    if (enemyHealthPoints <= 0) {
      setTimeout(() => {
        alert("You win nigga!");
        endGame();
      }, 500);
      return;
    }
    // function to go to next question
    Level++;
    if (Level < questions.length) {
      showQuestion();
    } else {
      endGame();
      alert("You win!");
    }
  }

  // hero healthbar functions
  else {
    heroHealthPoints -= 20;
    loadHealth();
    if (heroHealthPoints <= 0) {
      setTimeout(() => {
        endGame();
        alert("You Lose niiga!");
      }, 500);
      return;
    }
    alert("Wrong Answer nigga");
  }
  loadHealth();
}

function loadHealth() {
  

  heroStatus.style.width = heroHealthPoints + "%";
  enemyStatus.style.width = enemyHealthPoints + "%";
}

// placeholder para sa ibang function pwedeng para sa score summary
function endGame() {
  document.getElementById("level-page").style.display = "none";
  document.getElementById("end-page").style.display = "block";
}

function restartGame() {
  Level = 0;
  heroHealthPoints = 100;
  enemyHealthPoints = 100;

  document.getElementById("end-page").style.display = "none";
  document.getElementById("level-page").style.display = "block";
  showQuestion();
  loadHealth();
}
