// Quiz Question array
let questions = [
  {
  question: "What is the correct file extension for Javascript files?",
  answer: ".js",
  options: [
    ".java",
    ".js",
    ".javascript",
    ".script"
  ]
},
  {
  question: "JavaScript is ________ language",
  answer: "an interpreted",
  options: [
    "an interpreted",
    "a compiled",
    "Translated",
    "None of the above"
  ]
},
  {
  question: "Which of the following methods is used to access HTML elements using Javascript?",
  answer: "Both A and B",
  options: [
    "getElementbyId()",
    "getElementsByClassName()",
    "Both A and B",
    "None of the above"
  ]
},
  {
  question: "How can a datatype be declared to be a constant type?",
  answer: "const",
  options: [
    "const",
    "var",
    "let",
    "constant"
  ]
},
  {
  question: "When an operator's value is NULL, the typeof returned by the unary operator is?",
  answer: "Object",
  options: [
    "Boolean",
    "Object",
    "Undefined",
    "Integer"
  ]
},
{
  question: "What does the Javascript “debugger” statement do?",
  answer: "It acts as a breakpoint in a program.",
  options: [
    "It will debug all the errors in the program at runtime.",
    "It acts as a breakpoint in a program.",
    "It will debug error in the current statement if any.",
    "All of the above"
  ]
},
{
  question: "What does the 'toLocateString()' method do in JS?",
  answer: "Returns a localized string representation of an object.",
  options: [
    "Returns a localised object representation.",
    "Returns a parsed string.",
    "Returns a localized string representation of an object.",
    "None of the above."
  ]
},
{
  question: "Which of the following is not a Javascript framework?",
  answer: "Cassandra",
  options: [
    "Node",
    "Vue",
    "React",
    "Cassandra"
  ]
},
];

//selecting all required elements
const startQuiz = document.getElementById("start-btn");
const restart_quiz = document.getElementById("restart-btn");
const quizIntro = document.getElementById("quiz-intro");
const questionContainer = document.getElementById("question-container");
const quizResults = document.getElementById("quiz-results");
const questionList = document.querySelector(".question-list");

let timeValue =  100;
let questionCount = 0;
let quizScore = 0;
let counter;

// if continueQuiz button clicked
startQuiz.addEventListener('click', function() {
  quizIntro.classList.add("hide"); //hide info box
  questionContainer.classList.remove("hide"); //show quiz box
  showQuestions(0); //calling showQuestions function
  countDown(timeValue); //calling startTimer function
})

restart_quiz.addEventListener('click', function() {
  redirect("./index.html");
  questionContainer.classList.remove("hide");  //show quiz box
  quizResults.classList.add("hide"); //hide result box
  timeValue = 100; 
  questionCount = 0;
  quizScore = 0;
  showQuestions(questionCount); //calling showQuestions function
  clearInterval(counter); //clear counter
  countDown(timeValue); //calling startTimer function
})

function nextQuestion() {
  if(questionCount < questions.length - 1){ //if question count is less than total question length
      questionCount++; //increment the questionCount value
      showQuestions(questionCount); //calling showQuestions function
  }else{
      clearInterval(counter); //clear counter
      showResult(); //calling showResult function
  }
}

// Calling the questions and answer array and creating title and answer elements 
function showQuestions(index){
  const questionTitle = document.getElementById("question-title");
  //Create answers list and assign styling to the elements
  let questTitle = '<span>'+ questions[index].question +'</span>';
  let answerList = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
  questionTitle.innerHTML = questTitle; //assign quiz title to go inside question-title div
  questionList.innerHTML = answerList; //assign quiz questions to go inside question-list div
  
  //select all answer option element and the assign onclick attributes 
  const option = questionList.querySelectorAll(".option");
  for(i=0; i < option.length; i++){
      option[i].setAttribute("onclick", "answerSelected(this)");
  }
}

//fucntion to check if answer match correct answer 
function answerSelected(answer){
  let answerResult = document.getElementById("answerResult");
  let userAns = answer.textContent; 
  let correctAns = questions[questionCount].answer; 
  const allOptions = questionList.children.length; //getting all option items
  
  if (userAns == correctAns){ //if 
      quizScore += 1; //adds 1 to total quiz score
      answerResult.textContent = "Correct!"; //displays users choise is correct
      console.log("Correct!"); //Console for testing 
  } else{
       console.log("Incorrect!"); //Console for testing 
       timeValue = timeValue-10;
       answerResult.textContent = "Incorrect!"; //displays users choise is incorrect
  }

  //Waits .8 of a second before removing answer result and then displaying next question
  setTimeout(function() {
      answerResult.textContent = ""; 
      nextQuestion() 
     }, 800);
  
}

//End of quiz function to diplay final score and input for highscore table
function showResult(){
  quizIntro.classList.add("hide"); //hide info box
  questionContainer.classList.add("hide"); //hide quiz box
  quizResults.classList.remove("hide"); //show result box
  let finalScore = document.getElementById("final-score");
  finalScore.textContent = quizScore;
}

//Count down function
function countDown() {
  function startTimer(){
      console.log('timer suppose to go')
      var timer = setInterval(function(){
          timeValue--;
          document.getElementById('countDown').innerHTML=timeValue;
          if (timeValue < 0) {
              clearInterval(timer);
              showResult()
          }
      }, 1000);
  }
  startTimer();
};

//Highscore list function
var saveButton = document.getElementById("save");
var playerName = document.querySelector("#playerName");
var todoForm = document.querySelector("#highscore-form");
var highscoreList = document.querySelector("#highscore-list");

var highScores = [];
var playerName;
var highscoreResults = {};
var highscoreLists = [];

// The following function renders items in a todo list as <li> elements
function renderHighScores() {
   // Clear highscoreList element and update highscoresCountSpan
  highscoreList.innerHTML = "";
   // Render a new li for each todo
  console.log(highScores);
  for (var i = 0; i < highScores.length; i++) {
    var highScore = highScores[i];

    var li = document.createElement("li");
    li.textContent = "Player: " + highScore.Player + ", Score: " + highScore.Score;
    li.setAttribute("data-index", i);
    highscoreList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  var storedHighScores = JSON.parse(localStorage.getItem("highscoreList"));
  // If todos were retrieved from localStorage, update the todos array to it
  if (storedHighScores !== null) {
    highScores = storedHighScores;
  }
  // This is a helper function that will render todos to the DOM
  renderHighScores();
}

//Saves player initials and score as an object and pushs to local storage
function storeHighScores() {
  // Save related form data as an object
  var playerNameText = playerName.value.trim();
  var highscoreResults = {
    Player: playerNameText,
    Score: quizScore
  };
  console.log(highscoreResults)
  // Adds new quiz results to quiz list array
  highscoreLists = JSON.parse(localStorage.getItem("highscoreList"));
  highscoreLists.push(highscoreResults);
   //Saves highscore list to local storage
  localStorage.setItem("highscoreList", JSON.stringify(highscoreLists));
}

//Function to navigate between pages
function redirect(page)
  {
    window.location.href=(page);
  }

//Save button function to store user details to local storage 
saveButton.addEventListener("click", function(event) {
  event.preventDefault();
  storeHighScores();
  redirect("./highscore.html");
  });

// Calls init to retrieve data and renders it to the page on load
init()
