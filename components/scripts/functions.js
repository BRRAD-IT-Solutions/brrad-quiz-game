let Level = 0;
let heroHealthPoints = 100;
let enemyHealthPoints = 100;
const heroStatus = document.getElementById("heroHealth");
const enemyStatus = document.getElementById("enemyHealth");
const questions = [
  {
    question: "Where did you last see your dog?",
    answers: ["House", "Town", "Ramzel's", "Forrest"],
    correct: 3,
  },
  {
    question: "What is the dogs name?",
    answers: ["Gucci", "Tommy", "Tofu", "Tobi"],
    correct: 3,
  },
  {
    question: "What was the color of the ribbon on the scroll?",
    answers: ["Green", "Blue", "Red", "orange"],
    correct: 2,
  },
  {
    question: "Was the bridge broken in the start screen?",
    answers: ["Yes", "No", "Maybe", "I don't know"],
    correct: 0,
  },
  {
    question: "Was the scroll sealed when you found it?",
    answers: ["yes", "no", "maybe", "maybe"],
    correct: 1,
  },
  {
    question: "What was the year on the scroll?",
    answers: ["1902", "2025", "1660", "1602"],
    correct: 3,
  },
  {
    question: "What am I known as?",
    answers: ["Mind's Witch", "Knowledge Witch", "The Witcher", "Ramzel"],
    correct: 0,
  },
  {
    question: "When is ramzel birthday?",
    answers: ["June 1", "June 3", "July 3", "July 1"],
    correct: 3,
  },
  {
    question: "Whats my name?",
    answers: ["Sex", "Sphinx", "Syntax", "Six"],
    correct: 2,
  },
  {
    question: "Why do birds suddenly ____",
    answers: ["career", "azir", "martyr", "appear"],
    correct: 3,
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answers: ["footsteps", "money", "time", "space"],
    correct: 0,
  },
  {
    question: "What tastes much better than it smells?",
    answers: ["Yogurt", "Lanka", "Toungue", "Nose"],
    correct: 2,
  },
  {
    question: "What was at the bottom of the letter?",
    answers: ["Jb", "Aj", "ImGAy", "Jj"],
    correct: 0,
  },
  {
    question: "What's your name?",
    answers: ["Momonga", "Momonari", "Momodora", "Momoniku"],
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
    setButtonsEnabled(false);
    dogSide();
    enemyHealthPoints -= 10;
    loadHealth();

    if (enemyHealthPoints <= 0) {
      catSideDeath();
      return;
    }
    // function to go to next question
    Level++;
    if (Level < questions.length) {
      setTimeout(() => {
        showQuestion();
        setButtonsEnabled(true);
      }, 2500);
    } else {
      endGame();
    }
  }

  // hero healthbar functions
  else {
    catSide();
    setButtonsEnabled(false);
    heroHealthPoints -= 25;
    loadHealth();
    if (heroHealthPoints <= 0) {
      dogSideDeath();
      return;
    }
    setTimeout(() => {
      setButtonsEnabled(true);
    }, 2500);
  }
  loadHealth();
}

function loadHealth() {
  heroStatus.style.width = heroHealthPoints + "%";
  enemyStatus.style.width = enemyHealthPoints + "%";

  // color change if damaged hero
  if (heroHealthPoints <= 40) {
    heroStatus.style.backgroundColor = "orange";

    if (heroHealthPoints <= 20) {
      heroStatus.style.backgroundColor = "red";
    }
  } else {
    heroStatus.style.backgroundColor = "lime";
  }
  // color change if damaged enemy
  if (enemyHealthPoints <= 40) {
    enemyStatus.style.backgroundColor = "orange";

    if (enemyHealthPoints <= 20) {
      enemyStatus.style.backgroundColor = "red";
    }
  } else {
    enemyStatus.style.backgroundColor = "lime";
  }
}

// for restart game
function endGame() {
  document.getElementById("level-page").style.display = "none";
  document.getElementById("end-page").style.display = "block";
}

function restartGame() {
  Level = 0;
  heroHealthPoints = 100;
  enemyHealthPoints = 100;

  document.getElementById("characterDog").style.display = "block";
  document.getElementById("characterCat").style.display = "block";

  document.querySelector(".heroHealthBar").style.visibility = "visible";
  document.querySelector(".enemyHealthBar").style.visibility = "visible";

  document.getElementById("end-page").style.display = "none";
  document.getElementById("level-page").style.display = "block";
  showQuestion();
  loadHealth();
}

function nextLevel() {
  const levelPage = document.getElementById("level-page");
  const continuePage = document.getElementById("continue-page");

  levelPage.style.display = "none";
  continuePage.style.display = "block";

  setTimeout(() => {
    continuePage.classList.add("show");
  }, 50);
}

// buttons disable when animation
function setButtonsEnabled(enabled) {
  const buttons = Array.from(document.getElementById("answers").children);
  buttons.forEach((button) => {
    button.disabled = !enabled;
  });
}
// for animation

function dogSide() {
  const characterDog = document.getElementById("characterDog");
  const characterCat = document.querySelector(".characterCat");

  // Step 1: Dog runs to the cat
  characterDog.src = "/images/Character/dog/dog-walk.gif";
  characterDog.classList.remove("run-animation", "return-animation");
  void characterDog.offsetWidth; // Trigger reflow
  characterDog.classList.add("run-animation");

  // Step 2: Dog attacks
  characterDog.addEventListener(
    "animationend",
    () => {
      characterDog.src = "/images/Character/dog/dog-attack.gif";

      // Step 3: Cat gets damaged
      setTimeout(() => {
        characterCat.src = "/images/Character/cat/cat-damage (2).gif";

        // Step 3.1: Cat returns to idle
        setTimeout(() => {
          characterCat.src = "/images/Character/cat/cat-idle.gif";
        }, 1200); // Adjust this to match your damage animation duration

        // Step 4: Dog walks back
        setTimeout(() => {
          characterDog.src = "/images/Character/dog/dog-walkBack.gif";
          characterDog.classList.remove("run-animation", "return-animation");
          void characterDog.offsetWidth;
          characterDog.classList.add("return-animation");

          // Step 5: Dog becomes idle again
          characterDog.addEventListener(
            "animationend",
            () => {
              characterDog.src = "/images/Character/dog/dog-idle.gif"; // Corrected the typo here
              setButtonsEnabled(true);
            },
            { once: true }
          );
        }, 800); // Wait after attack before walking back
      }, 500); // Delay before cat "dies"
    },
    { once: true }
  );
}

function catSideDeath() {
  const characterDog = document.getElementById("characterDog");
  const characterCat = document.querySelector(".characterCat");

  // Step 1: Dog runs to the cat
  characterDog.src = "/images/Character/dog/dog-walk.gif";
  characterDog.classList.remove("run-animation", "return-animation");
  void characterDog.offsetWidth; // Trigger reflow
  characterDog.classList.add("run-animation");

  // Step 2: Dog attacks
  characterDog.addEventListener(
    "animationend",
    () => {
      characterDog.src = "/images/Character/dog/dog-attack.gif";

      // Step 3: Cat gets death
      setTimeout(() => {
        characterCat.src = "/images/Character/cat/cat-dead.gif";
        setTimeout(() => {
          characterCat.style.display = "none";
          document.querySelector(".heroHealthBar").style.visibility = "hidden";
          document.querySelector(".enemyHealthBar").style.visibility = "hidden";
        }, 500);

        // Step 4: Dog walks back
        setTimeout(() => {
          characterDog.src = "/images/Character/dog/dog-walkBack.gif";
          characterDog.classList.remove("run-animation", "return-animation");
          void characterDog.offsetWidth;
          characterDog.classList.add("return-animation");

          // Step 5: Dog becomes idle again
          characterDog.addEventListener(
            "animationend",
            () => {
              characterDog.src = "/images/Character/dog/dog-idle.gif";
              setTimeout(() => {
                nextLevel();
              }, 500);
            },
            { once: true }
          );
        }, 800); // Wait after attack before walking back
      }, 500); // Delay before cat "dies"
    },
    { once: true }
  );
}

// cat movement
function catSide() {
  const characterCat = document.querySelector(".characterCat");
  const characterDog = document.getElementById("characterDog");

  // Step 1: Cat runs to the dog
  characterCat.src = "/images/Character/cat/cat-run.gif";
  characterCat.classList.remove("run-cat-animation", "return-cat-animation");
  void characterCat.offsetWidth; // Trigger reflow
  characterCat.classList.add("run-cat-animation");

  // Step 2: Cat attacks
  characterCat.addEventListener(
    "animationend",
    () => {
      characterCat.src = "/images/Character/cat/cat-attack.gif";

      // Step 3: Dog gets damaged
      setTimeout(() => {
        characterDog.src = "/images/Character/dog/dog-damage.gif";

        // Step 3.1: Dog returns to idle
        setTimeout(() => {
          characterDog.src = "/images/Character/dog/dog-idle.gif";
        }, 1000); // Adjust this to match your damage animation duration

        // Step 4: Cat walks back
        setTimeout(() => {
          characterCat.src = "/images/Character/cat/cat-runBack.gif";
          characterCat.classList.remove(
            "run-cat-animation",
            "return-cat-animation"
          );
          void characterCat.offsetWidth;
          characterCat.classList.add("return-cat-animation");

          // Step 5: Cat becomes idle again
          characterCat.addEventListener(
            "animationend",
            () => {
              characterCat.src = "/images/Character/cat/cat-idle.gif";
              setButtonsEnabled(true);
            },
            { once: true }
          );
        }, 800); // Wait after attack before walking back
      }, 500); // Delay before dog "takes hit"
    },
    { once: true }
  );
}

function dogSideDeath() {
  const characterCat = document.querySelector(".characterCat");
  const characterDog = document.getElementById("characterDog");

  // Step 1: Cat runs to the dog
  characterCat.src = "/images/Character/cat/cat-run.gif";
  characterCat.classList.remove("run-cat-animation", "return-cat-animation");
  void characterCat.offsetWidth;
  characterCat.classList.add("run-cat-animation");

  // Step 2: Cat attacks
  characterCat.addEventListener(
    "animationend",
    () => {
      characterCat.src = "/images/Character/cat/cat-attack.gif";

      // Step 3: Dog dies
      setTimeout(() => {
        characterDog.src = "/images/Character/dog/dog-dead.gif";
        setTimeout(() => {
          characterDog.style.display = "none";
          document.querySelector(".heroHealthBar").style.visibility = "hidden";
          document.querySelector(".enemyHealthBar").style.display = "none";
        }, 500);

        // Step 4: Cat walks back
        setTimeout(() => {
          characterCat.src = "/images/Character/cat/cat-runBack.gif";
          characterCat.classList.remove(
            "run-cat-animation",
            "return-cat-animation"
          );
          void characterCat.offsetWidth;
          characterCat.classList.add("return-cat-animation");

          // Step 5: Cat becomes idle again
          characterCat.addEventListener(
            "animationend",
            () => {
              characterCat.src = "/images/Character/cat/cat-idle.gif";
              setTimeout(() => {
                endGame();
              }, 500);
            },
            { once: true }
          );
        }, 800); // Wait after attack before walking back
      }, 500); // Delay before dog "dies"
    },
    { once: true }
  );
}
