//Linking variables to start page elements
var startBtn = document.getElementById("startButton");
var titleEl = document.getElementById("title");
var descEl = document.getElementById("desc");
//linking a variable to the timer element
var timerEl = document.getElementById("timer");
//linking variables to finished page elements
var finishPageEl = document.getElementById("finishPage");
var scoreNumEl = document.getElementById("scoreNum");
var initialsEl = document.getElementById("initials")
var finishBtn = document.getElementById("submit")


var questionEl = document.getElementById("question");
var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");

var answer1BtnEl = document.createElement('button');
var answer2BtnEl = document.createElement('button');
var answer3BtnEl = document.createElement('button');
var answer4BtnEl = document.createElement('button');

//Creating variables
var timerCount;
var timer;
var isFinished;
var questionNum = 0;
var currentQuestion;

var scoreboardArr = [];

// Creating array of question objects
var questionsArr = [
    {
        question: "Commonly used data types DO NOT include: ",
        answer1:"Strings",
        answer2:"Alerts",
        answer3:"Numbers",
        answer4:"Booleans",
        correct:"Alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        answer1:"Quotes",
        answer2:"Curly brackets",
        answer3:"Square brackets",
        answer4:"Parentheses",
        correct:"Parentheses",
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answer1:"Numbers and Strings",
        answer2:"Other Arrays",
        answer3:"Booleans",
        answer4:"All of the above",
        correct:"All of the above",
    },
    {
        question: "String values must be enclosed within _____ when being assigned to varibales.",
        answer1:"Commas",
        answer2:"Curly brackets",
        answer3:"Quotes",
        answer4:"Parentheses",
        correct:"Quotes",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1:"Console.log",
        answer2:"For loops",
        answer3:"Terminal/ Bash",
        answer4:"JavaScript",
        correct:"Console.log" ,
    }    
];

function init(){
    //Pulling any scores in local storage and saving it to scoreboard Array
    scoreboardArr = JSON.parse(localStorage.getItem("scores"))
    if (scoreboardArr === null ){
        scoreboardArr = []
    }
    console.log(scoreboardArr)
}

function startGame() {
    //Resetting timercount counter
    timerCount = 75;
    //Resetting isFinished
    isFinished = false;
    //Resetting questionNum counter
    questionNum = 0;
    hideStart();
    showQuestion();
    startTimer();
};

function startTimer(){
    timer = setInterval(function(){
        timerCount--;
        timerEl.textContent = timerCount;
        //Checks if game is finished while there is time left. If finished stops timer and ends game
        if (timerCount >= 0){
            if (isFinished){
                clearInterval(timer);
                finishGame();
            };
        };
        //Stops timer and ends game if there is no time left or if timer is less than 0.
        if (timerCount <= 0){
            timerCount = 0;
            timerEl.textContent = timerCount;
            clearInterval(timer);
            finishGame();
        };
    }, 1000);
}
//function to hide start elements
function hideStart(){
    titleEl.style.display = "none";
    descEl.style.display = "none";
    startBtn.style.display = "none";
}
//function to show the current question on screen
function showQuestion(){
    currentQuestion = questionsArr[questionNum];
    questionEl.textContent = currentQuestion.question;
    answer1BtnEl.textContent = '1.' + currentQuestion.answer1;
    if (currentQuestion.answer1 === currentQuestion.correct) {
        answer1BtnEl.setAttribute('correct',true)
    } else{
        answer1BtnEl.setAttribute('correct',false)
    }
    answer1El.appendChild(answer1BtnEl);
    answer2BtnEl.textContent = '2.' + currentQuestion.answer2;
    if (currentQuestion.answer2 === currentQuestion.correct) {
        answer2BtnEl.setAttribute('correct',true)
    } else{
        answer2BtnEl.setAttribute('correct',false)
    }
    answer2El.appendChild(answer2BtnEl);
    answer3BtnEl.textContent = '3.' + currentQuestion.answer3;
    if (currentQuestion.answer3 === currentQuestion.correct) {
        answer3BtnEl.setAttribute('correct',true)
    } else{
        answer3BtnEl.setAttribute('correct',false)
    }
    answer3El.appendChild(answer3BtnEl);
    answer4BtnEl.textContent = '4.' + currentQuestion.answer4;
    if (currentQuestion.answer4 === currentQuestion.correct) {
        answer4BtnEl.setAttribute('correct',true)
    } else{
        answer4BtnEl.setAttribute('correct',false)
    }
    answer4El.appendChild(answer4BtnEl);
    questionEl.setAttribute('style','display:block')

}

function checkCorrect(event){
    var chosenAnswer = event.target;
    var isCorrect = chosenAnswer.getAttribute('correct');
    console.log(chosenAnswer)
    console.log(isCorrect)
    if (isCorrect === "true"){
        console.log("correct");
        questionNum++;
        if (questionNum < questionsArr.length){
            showQuestion();
        } else{
            isFinished = true;
        }
        
    } else{
        console.log("wrong")
        timerCount = timerCount - 15;
    }

}
//Shows finish section, shows score and hides question section and answer buttons
function finishGame(){
    scoreNumEl.textContent = timerCount
    questionEl.setAttribute('style','display:none')
    answer1BtnEl.setAttribute('style','display:none')
    answer2BtnEl.setAttribute('style','display:none')
    answer3BtnEl.setAttribute('style','display:none')
    answer4BtnEl.setAttribute('style','display:none')
    finishPageEl.style.display = "block";
}

function submitFormHandler(event){
    //Stops default refresh
    event.preventDefault();
    //creates a user object with user inputted initials and time score
    var user = {
        initials: initialsEl.value,
        score: scoreNumEl.textContent,
    }
    //adds user object to the end of scoreboard array
    scoreboardArr.push(user)
    console.log(scoreboardArr)
    //stores updated array in local storage
    localStorage.setItem("scores", JSON.stringify(scoreboardArr))

    //redirects to highscore page
    // window.location.href = "./highscore.html"
}

answer1BtnEl.addEventListener('click',checkCorrect)
answer2BtnEl.addEventListener('click',checkCorrect)
answer3BtnEl.addEventListener('click',checkCorrect)
answer4BtnEl.addEventListener('click',checkCorrect)

startBtn.addEventListener("click", startGame)

finishBtn.addEventListener("click",submitFormHandler)

init()