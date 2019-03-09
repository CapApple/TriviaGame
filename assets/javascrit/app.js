var questions = [
    "In the song \"Frosty the Snowman\", what made Frosty come to life?", 
    "What Christmas beverage is also known as 'milk punch?'",
    "What Christmas-themed ballet premiered in Saint Petersburg, Russia in 1892?",
    "What well-known Christmas carol became the first song ever broadcast from space in 1965?",
    "In what modern-day country was Saint Nicholas born?",
    "\"Miracle on 34th Street\" centers on what real-life department store?"
]
var answers = [
    ["An old silk hat", "An old cotton hat", "An old silk coat", "An old cotton coat"],
    ["Eggnog", "Milk", "Almond milk", "Coconut milk"],
    ["The Nutcracker", "Cinderella", "Swan Lake", "The Sleeping Beauty"],
    ["Jingle Bell", "Silent Night", "The Christmas Song", "Blue Christmas"],
    ["Turkey", "Norway", "Germany", "Israel"],
    ["Macy's", "Dilliards", "Nord Strom", "Neiman Marcus"]
]
var questionNumber = 0;
var right = 0;
var wrong = 0;
var timeOut = 0;
// var correctAnswer = (answers[questionNumber])[0];
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
    // var correctAnswer = (answers[questionNumber])[0];
    // get this quesiton's answer arrays and shuffle
    // THis will not work due to how JS memorize arrays and pbjects:
    // var thisAnswer = answers[questionNumber][i];
    var thisAnswers = [];
    for(i=0;i<4;i++){
        thisAnswers.push((answers[questionNumber])[i]);
    }  
    shuffle(thisAnswers);
    console.log("WOO" + thisAnswers);
    console.log("HOO" + answers[questionNumber]);
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


function newQuestion(){
    correctAnswer = (answers[questionNumber])[0];
    start();
    countdown();
}

function countdown(){
    // var correctAnswer = (answers[questionNumber])[0];
    var userChoice = "";
    var timeLeft = 10;
    var click = false;
    $(".time").text(timeLeft);
    var timer = setInterval(function(){
        timeLeft--;
        $(".time").text(timeLeft);
        // if time runs out
        if(timeLeft === 0){
            clearInterval(timer);
            $("ul").css("display", "none");
            $("#answer").html("Time out! The answer is: <br><br>" + correctAnswer);
            questionNumber++;
            timeOut++;
            setTimeout(function(){
                newQuestion();
            }, 3000);
        }
        // if choose 
        $("li").on("click",function(){
            click = true;
            userChoice = $(this).html();
            console.log("clicked!");
            console.log(userChoice);
            console.log("HAHA" + correctAnswer);
            return;
        });

        if(userChoice === correctAnswer && click === true){
            console.log("Right!");
            clearInterval(timer);
            $("ul").css("display", "none");
            $("#answer").html("Yep! The answer is: <br><br>" + correctAnswer + "!"); 
            questionNumber++;
            right++;
            if(questionNumber === questions.length){
                setTimeout(function(){
                    $(".container").html("Game Over! Your Results: <br><br>" + right + " right<br>" + wrong + " wrong<br>" + timeOut + " time out");
                },3000);
            }
            setTimeout(function(){
                newQuestion();
            }, 3000);
        }
        
        if(click === true && userChoice != correctAnswer){
            console.log("wrong!");
            clearInterval(timer);
            $("ul").css("display", "none");
            $("#answer").html("Nope! The answer is: <br><br>" + correctAnswer + "!"); 
            questionNumber++;
            wrong++;
            if(questionNumber === questions.length){
                setTimeout(function(){
                    $(".container").html("Game Over! Your Results: <br><br>" + right + " right<br>" + wrong + " wrong<br>" + timeOut + " time out");
                },3000);
            }
            setTimeout(function(){
                newQuestion();
            }, 3000);
        }
    }, 1000);
}


$("#start").on("click", function(){
    newQuestion();
});