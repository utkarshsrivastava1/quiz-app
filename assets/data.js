const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

// counter
let timerCount = 50;
// all selector
const cardContent = document.querySelector(".render-content");
const timer = document.querySelector(".timer");
const result = document.querySelector(".answer");
const showLeaderBoard = document.getElementById("leaderboard");
let countDownTimer;

let totalScore = 0;

function clearStore() {
  localStorage.clear("highscore");
  document.querySelector(".userList").innerHTML = "";
}
function goBack() {
  totalScore = 0;
  cardContent.innerHTML = `
  <h1>Coding Quiz Challenge</h1>
              <p>
                Try to answer to following code-related questionswithin the time
                limit.
              </p>
              <p>
                Keep in mind that incorrect answers will penalize your
                score/time by ten seconds
              </p>
              <button class="btn bg-b t-white" onclick="startQuiz()">
                Start Quiz
              </button>
  `;
}

function showHighScore() {
  let storedData = localStorage.getItem("highscore");
  console.log(storedData);
  function renderData() {
    let userList = "";
    JSON.parse(storedData).forEach((el) => {
      userList += `
<li>${el.name} - ${el.score}</li>
`;
    });
    return userList;
  }
  if (storedData) {
    let data = `
<h1>HighScores</h1>
            <div>
              <ol class="userList">
                ${renderData()}
              </ol>
              <button class="btn bg-b t-white" onclick="goBack()">Go Back</button>
              <button class="btn bg-b t-white" onclick="clearStore()">Clear Highscores</button>
            </div>
`;
    cardContent.innerHTML = data;
  } else {
    let data = `
    <h1>HighScores</h1>
                <div>
                  <ol class="userList">
                  </ol>
                  <button class="btn bg-b t-white" onclick="goBack()">Go Back</button>
                  <button class="btn bg-b t-white" onclick="clearStore()">Clear Highscores</button>
                </div>
    `;
    cardContent.innerHTML = data;
  }
}
function submitForm(e) {
  e.preventDefault();
  const val = document.querySelector(".userName");
  let storedData = localStorage.getItem("highscore");

  if (val.value) {
    if (storedData) {
      localStorage.setItem(
        "highscore",
        JSON.stringify([
          ...JSON.parse(storedData),
          { name: val.value, score: totalScore },
        ])
      );
    } else {
      localStorage.setItem(
        "highscore",
        JSON.stringify([{ name: val.value, score: totalScore }])
      );
    }
    showHighScore();
  }
}

function allDoneScreen() {
  let data = `<div class="get-done">
  <h1>All done!</h1>
  <div>
    <p>Your final score is <span class="score">${totalScore}</span></p>
    <form onsubmit="submitForm(event)">
      <label for="">Enter initials:</label>
      <input type="text" class="userName" />
      <button class="btn bg-b t-white">Submit</button>
    </form>
  </div>
</div>`;
  cardContent.innerHTML = data;
  result.setAttribute("hidden", "hidden");
}

function checkAns(e, obj) {
  const option = e.children[0].dataset.option;
  const correctAnswer = questions[obj].answer;
  console.log(option, correctAnswer);

  if (option === correctAnswer) {
    console.log(option, correctAnswer);
    totalScore += 1;
    result.textContent = "Correct!";
    result.removeAttribute("hidden");
  } else {
    timerCount -= 10;
    result.textContent = "Incorrect!";
    result.removeAttribute("hidden");
  }
  if (obj + 1 === questions.length) {
    clearInterval(countDownTimer);
    timer.textContent = 0;
    allDoneScreen();
    // show done screen
  } else {
    quizQuestionSelector(obj + 1);
  }
}
function runTimer() {
  timerCount -= 1;
  console.log(timerCount);
  timer.innerHTML = timerCount;
}

function quizQuestionSelector(quesNO) {
  const question = questions[quesNO];
  function quizQuestion() {
    let ques = "";
    question.options.forEach((element) => {
      ques += ` <div class="options p-1 bg-b t-white" onclick="checkAns(this,${JSON.stringify(
        quesNO
      )})">
    <div data-option="${element}">${element}</div>
  </div>`;
    });
    return ques;
  }
  let data = `
    <h1>${question.questionText}</h1>
    <div>
      ${quizQuestion()}
    </div>
  `;

  cardContent.innerHTML = data;
}

// event listener
function startQuiz() {
  quizQuestionSelector(0);
  countDownTimer = setInterval(() => {
    if (timerCount === 0) {
      clearInterval(countDownTimer);
      allDoneScreen();
      return;
    }
    runTimer();
  }, 1000);
}

showLeaderBoard.addEventListener("click", () => {
  console.log("gg");
  showHighScore();
});
