var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");
var mainQuest = document.getElementById("questionBox");
var ansChoice = "";
var questionNum = 0;
let arrObj = JSON.parse(localStorage.getItem('playerScore')) || [];
let scoreReport="";

// Question objects
var q1 = { tex: "Inside which HTML element do we put the JavaScript?", ans1: "<scripting>", ans2: "<javascript>", ans3: "<script>", correct: "3" };
var q2 = { tex: "Where is the correct place to insert a JavaScript?", ans1: "The <body> section", ans2: "The <head> section", ans3: "Both the <head> and the <body> sections", correct: "1" };
var q3 = { tex: "How to write an IF statement in JavaScript?", ans1: "if i == 5: ", ans2: "if(i==5)", ans3: "if i = 5", correct: "2" };
var q4 = { tex: "How does a WHILE loop start?", ans1: "while(i<=10;i++)", ans2: "while(i<=10)", ans3: "while i in range 10", correct: "2" };
var q5 = { tex: "How can you add a comment in a JavaScript?", ans1: "<!--This is a comment-->", ans2: "#This is a comment", ans3: "//This is a comment", correct: "3" };
var score = 0;
var playerInit = "";
// Questions array
var allQuest = [];

// Populate question array
allQuest.push(q1);
allQuest.push(q2);
allQuest.push(q3);
allQuest.push(q4);
allQuest.push(q5);
mainQuest.innerText = allQuest[0].tex;
document.getElementById("1").innerText = allQuest[0].ans1;
document.getElementById("2").innerText = allQuest[0].ans2;
document.getElementById("3").innerText = allQuest[0].ans3;

function setAnswer(clicked_id) {
    ansChoice = clicked_id;
}

function checkAns() {
    if (ansChoice == allQuest[questionNum].correct) {
        switchQues();
    }
    else {
        secondsLeft = secondsLeft - 10;
    }
}

//switches question & answers if less than number of questions
function switchQues() {
    questionNum++;
    if (questionNum < 5) {
        mainQuest.innerText = allQuest[questionNum].tex;
        document.getElementById("1").innerText = allQuest[questionNum].ans1;
        document.getElementById("2").innerText = allQuest[questionNum].ans2;
        document.getElementById("3").innerText = allQuest[questionNum].ans3;
    }
    /*else{
        storeScore();
        displayScores()
    */
}

function storeScore(myScore) {
    document.getElementById("1").style.display = "none";
    document.getElementById("2").style.display = "none";
    document.getElementById("3").style.display = "none";
    mainQuest.style.display = "none";
    timeEl.style.display = "none";
    var initials = prompt("Please enter your initials to store your score");
    if (initials != null) {
        let playerScore = {
            name: initials,
            high: myScore
        }

        arrObj.push(playerScore);
        arrObj.sort(function(a,b){
            return b.high - a.high;
        });
       // localStorage.setItem('initials', initials);
       // localStorage.setItem("score", myScore);
        localStorage.setItem('playerScore', JSON.stringify(arrObj));
    }
}

function displayScores(){
    for(var i =0; i<5;i++){
        scoreReport=scoreReport + "\n" + localStorage.getItem(playerScore[i]);
    };
    
    document.getElementById("highScoreList").innerText = scoreReport;

}


var secondsLeft = 30;

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left";

        if (secondsLeft <= 0 || questionNum == 5) {
            score = secondsLeft;
            clearInterval(timerInterval);
            storeScore(score);
            displayScores();
        }

    }, 1000);
}

setTime();
