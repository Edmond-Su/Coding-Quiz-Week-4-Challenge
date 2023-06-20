var scorelistEl = document.getElementById("scorelist")

var clearBtn = document.getElementById("clearScores")

var scoreboardArr = [];

function init(){
    //Pulling any scores in local storage and saving it to scoreboard Array
    scoreboardArr = JSON.parse(localStorage.getItem("scores"));
    //Sorts array score in descending order if array isnt null
    if (scoreboardArr === null ){
        scoreboardArr = []
    }else{
        scoreboardArr.sort((a,b)=> b.score - a.score);
    }
    renderScoreboard();
};

function renderScoreboard(){
    //Clears scoreboard list
    scorelistEl.innerHTML = "";
    //Creates a li for each score and appends it to scorelistEl
    for (var i = 0; i < scoreboardArr.length; i++) {
        var itemNum = i+1;
        var li = document.createElement("li");
        li.textContent = itemNum + ". " + scoreboardArr[i].initials + "-" + scoreboardArr[i].score;
        scorelistEl.appendChild(li);
        //Adding a background color for every odd li
        if (!(itemNum % 2 == 0)){
            li.setAttribute("style", "background-color: #e7dcf3;");
        };
    };
};

//Empties current scoreboard array and removes locally stored scores
function clearScores(){
    scoreboardArr = [];
    localStorage.removeItem("scores");
    renderScoreboard();
}
//Event listener for clear scores button
clearBtn.addEventListener("click",clearScores);

init();
