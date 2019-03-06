var questions = [
    "In the song \"Frosty the Snowman\", what made Frosty come to life?", 
    "What Christmas beverage is also known as 'milk punch?'",
    "What Christmas-themed ballet premiered in Saint Petersburg, Russia in 1892?",
    "What well-known Christmas carol became the first song ever broadcast from space in 1965?",
    "In what modern-day country was Saint Nicholas born?"
]
var answers = [
    ["An old silk hat", "An old cotton hat", "An old silk coat", "An old cotton coat"],
    ["Eggnog", "Milk", "Almod milk", "Coconut milk"],
    ["The Nutcracker", "Cinderella", "Swan Lake", "The Sleeping Beauty"],
    ["Jingle Bell", "Silent Night", "The Christmas Song", "Blue Christmas"],
    ["Turkey", "Norway", "Germany", "Israel"]
]
var questionNumber = 0;
var correctAnswer = answers[questionNumber][0];
function shuffle(arr){
    for(var i = arr.length-1; i--; i>=0){
        var index = Math.floor(Math.random()*i);
        var temp = arr[i];
        arr[i] = arr[index];
        arr[index] = temp;
    }
}

function start(){
    var question = questions[questionNumber];
    // get this quesiton's answer arrays and shuffle
    // THis will not work due to how JS memorize arrays and pbjects:
    // var thisAnswer = answers[questionNumber][i];
    var thisAnswers = [];
    for(i=0;i<4;i++){
        thisAnswers.push(answers[questionNumber][i]);
    }  
    shuffle(thisAnswers);
    console.log(thisAnswers);
    console.log(answers[questionNumber]);
    $("h6").css("display", "block");
    $("#button").html("");
    $("#question").html(question);
    $("#answer").html("");
    $("ul").css("display", "block");
    // output choices 
    for(var i = 1; i<5; i++){
        $("#choice-"+i).html(thisAnswers[i-1]);
    }
}

function countdown(){
    var timeLeft = 10;
    $(".time").text(timeLeft);
    var timer = setInterval(function(){
        timeLeft--;
        $(".time").text(timeLeft);
        if(timeLeft === 0){
            clearInterval(timer);
            answerIs();
            questionNumber++;
            setTimeout(function(){
                start();
                countdown();
            }, 3000);
        }
    }, 1000);
}

function answerIs(){
    $("ul").css("display", "none");
    $("#answer").html("Time out! The answer is: <br>" + answers[questionNumber][0]);
}

$("#start").on("click", function(){
    start();
    countdown();
});