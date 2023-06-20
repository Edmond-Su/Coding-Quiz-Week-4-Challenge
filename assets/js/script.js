//Linking variables to page elements
var startPageEl = document.getElementById("startPage");
var startBtn = document.getElementById("startButton");

var timerEl = document.getElementById("timer");

var finishPageEl = document.getElementById("finishPage");
var scoreNumEl = document.getElementById("scoreNum");
var initialsEl = document.getElementById("initials")
var finishBtn = document.getElementById("submit")

var questionEl = document.getElementById("question");
var answerlistEl = document.getElementById("answerlist");
var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");
//creating buttons for answers
var answer1BtnEl = document.createElement('button');
var answer2BtnEl = document.createElement('button');
var answer3BtnEl = document.createElement('button');
var answer4BtnEl = document.createElement('button');

//Creating variables
var timerCount;
var timer;
var isFinished = false;
var questionNum = 0;
var currentQuestion;
var scoreboardArr = [];

// Creating array of objects with questions and answers
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
//Timer function
function startTimer(){
    timer = setInterval(function(){
        timerCount--;
        //Prints time on screen
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
    startPageEl.setAttribute('style','display:none');
    startBtn.setAttribute('style','display:none');
}
//function to show the current question on screen
function showQuestion(){
    //Clearing question and answers
    questionEl.innerHTML = "";
    answerlistEl.innerHTML = "";
    //Assigning the object to seperate variable
    currentQuestion = questionsArr[questionNum];
    //Rendering current question
    questionEl.textContent = currentQuestion.question;
    //Creating array of answers
    var currentAnswers = [currentQuestion.answer1,currentQuestion.answer2,currentQuestion.answer3,currentQuestion.answer4]
    //Loop creating a button for each answer
    for (var i = 0; i < currentAnswers.length; i++) {
        var answerNum = i+1;
        var li = document.createElement('li');
        var answerBtn = document.createElement('button');
        answerBtn.textContent = answerNum+". "+ currentAnswers[i];
        //If this button matches the correct answer the "correct" attribute is assigned and set to true otherwise it is set to false
        if (currentAnswers[i] === currentQuestion.correct) {
            answerBtn.setAttribute('correct',true);
        } else{
            answerBtn.setAttribute('correct',false);
        };
        //Appending the created li and btn to be rendered on screen
        li.appendChild(answerBtn);
        answerlistEl.appendChild(li);
    };

    questionEl.setAttribute('style','display:block');
}

function checkCorrect(event){
    var chosenAnswer = event.target;
    if (chosenAnswer.matches("button"===false)){
        return
    }
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
    questionEl.innerHTML = ""
    questionEl.setAttribute('style','display:none')
    answerlistEl.innerHTML = ""
    answerlistEl.setAttribute('style','display:none')
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
    window.location.href = "./highscore.html"
}

answerlistEl.addEventListener("click", checkCorrect)

startBtn.addEventListener("click", startGame)

finishBtn.addEventListener("click",submitFormHandler)

init()