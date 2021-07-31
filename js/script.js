const imgArr = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.png", "img/7.jpg", "img/8.jpg", "img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.png", "img/7.jpg", "img/8.jpg"];
var cur = "";
var ind = 0;
var curId = 0;
var score = 0;
var time = 100;
var start = 0;

var x = setInterval(function() {
    time--;
    document.getElementById("time").innerHTML = time + "s";
    if (time == 0) {
        endGame();
        clearInterval(x);

    }

}, 1000);

function startGame() {
    var start = 1;
    var cards = document.getElementsByTagName("img");
    for (let i = 1; i <= cards.length; i++) {
        var index = Math.floor(Math.random() * imgArr.length);
        document.getElementById("in" + i).value = imgArr[index];
        imgArr.splice(index, 1)
    }

}


function getCard(id, name) {
    document.getElementById(id).src = name;
    if (ind == 1 && cur !== "") {
        setTimeout(function() {
            if (cur == name) {
                score++;
                document.getElementById("t" + id).style.display = "none";
                document.getElementById("t" + curId).style.display = "none";
                document.getElementById(id).src = ""
                document.getElementById(id).className += "done";
                document.getElementById(curId).className += "done";
                document.getElementById(curId).src = "";
            } else {
                document.getElementById(id).src = "img/cover.PNG";
                document.getElementById(curId).src = "img/cover.PNG";

            }
            cur = ""
            ind = 0;
            curId = 0;
        }, 1000);
    } else {
        ind = 1;
        cur = name;
        curId = id;
    }
}

function endGame() {
    document.getElementById("gamearea").style.display = "none"
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance("Time Up");
    synth.speak(utterThis);
    var sc = localStorage.getItem("highscore");

    if (sc !== "null" || sc !== "NaN") {
        if (parseInt(sc) > score) {
            showWin("no");
        } else {
            localStorage.setItem("highscore", score)
            showWin("new");
        }
    } else {
        localStorage.setItem("highscore", score);
        showWin("new");
    }

}

function showWin(type) {
    document.getElementById("win").style.display = "block";
    if (type == "new") {
        document.getElementById("h-s").innerHTML = "New High Score!";
    }
    getScore();
}


function getScore() {
    if (localStorage.getItem("highscore") == "null" || localStorage.getItem("highscore") == "NaN") {
        document.getElementById("score").innerHTML = 'High Score: 0';
    } else {
        document.getElementById("score").innerHTML = 'High Score: ' + localStorage.getItem("highscore");
    }
}