//Linking a variable to start button in html
var startBtn = document.getElementById("startButton");

var timerElement = document.getElementById("timer");

var titleElement = document.getElementById("title");

var descElement = document.getElementById("desc")

var finishPageElement = document.getElementById("finishPage")

//Creating a variable
var timerCount;
var timer;
var isFinished;
var question;


// Creating objects for each question
var question1 = {
    random: true,
    question: "Commonly used data types DO NOT include: ",
    wrong1:"Strings",
    wrong2:"Booleans",
    wrong3:"Numbers",
    correct:"Alerts",
};

var question2 = {
    random: true,
    question: "The condition in an if / else statement is enclosed within _____.",
    wrong1:"Quotes",
    wrong2:"Curly Brackets",
    wrong3:"Square Brackets",
    correct:"Parentheses",
};

var question3 = {
    random: false,
    question: "Arrays in JavaScript can be used to store _____.",
    wrong1:"Numbers and Strings",
    wrong2:"Other Arrays",
    wrong3:"Booleans",
    correct:"All of the above",
};

var question4 = {
    random: true,
    question: "String values must be enclosed within _____ when being assigned to varibales.",
    wrong1:"Commas",
    wrong2:"Curly Brackets",
    wrong3:"Parentheses",
    correct:"Quotes",
};

var question5 = {
    random: true,
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    wrong1:"JavaScript",
    wrong2:"For loops",
    wrong3:"Terminal/ Bash",
    correct:"Console.log",
};

var questions = [question1, question2,question3,question4,question5];

var questionsArr = [
    {
        random: true,
        question: "Commonly used data types DO NOT include: ",
        wrong1:"strings",
        wrong2:"booleans",
        wrong3:"numbers",
        correct:"alerts",
    },
    {
        random: true,
        question: "The condition in an if / else statement is enclosed within _____.",
        wrong1:"quotes",
        wrong2:"curly brackets",
        wrong3:"square brackets",
        correct:"parentheses",
    },
    {
        random: false,
        question: "Arrays in JavaScript can be used to store _____.",
        wrong1:"Numbers and Strings",
        wrong2:"Other Arrays",
        wrong3:"Booleans",
        correct:"All of the above",
    },
    {
        random: true,
        question: "String values must be enclosed within _____ when being assigned to varibales.",
        wrong1:"commas",
        wrong2:"curly brackets",
        wrong3:"parentheses",
        correct:"quotes",
    },
    {
        random: true,
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        wrong1:"JavaScript",
        wrong2:"For loops",
        wrong3:"Terminal/ Bash",
        correct:" Console.log",
    }    
];

function startGame() {
    timerCount = 75;
    isFinished = false;
    startTimer();
    hideStart();
    showQuestions();

};

function startTimer(){
    timer = setInterval(function(){
        timerElement.textContent = timerCount;
        timerCount--;
        if (timerCount >= 0){
            if (isFinished){
                clearInterval(timer);
                finishGame();
            };
        };
        if (timerCount === 0){
            clearInterval(timer);
            finishGame();
        };
    }, 1000);
}

function hideStart(){
    titleElement.style.display = "none";
    descElement.style.display = "none";
    startBtn.style.display = "none";
}

function showQuestions(){

}

function finishGame(){
    finishPageElement.style.display = "block";
    
}


//
// startBtn.addEventListener("click", function(){
//     console.log("CLICK")
// });

startBtn.addEventListener("click", startGame)