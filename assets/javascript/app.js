var correct = 0;
var incorrect = 0;
var unanswered = 0;
var count = 0;
var time = 0;
var questionArray = [];
var interval = 0;

var q1 = [
    "q1",
    "a",
    "i1",
    "i2",
    "i3",
];
questionArray.push(q1);

var q2 = [
    "q2",
    "a",
    "i1",
    "i2",
    "i3",
];
questionArray.push(q2);

console.log(questionArray);

$("#start").text("Start");
$("#answers-container")[0].style.display = "none";

console.log($("#right-answer"));

function displayTime() {
    $("#timer").text(`Time Remaining: ${time} Seconds`);
}



function startTimer() {
    interval = setInterval(function () {
        if (time <= 0) {
            unanswered++;
            clearInterval(interval);
            console.log("clearInterval");

            $("#question").text("Out of Time!");
            $("#right-answer div:first-child").text(`The Correct Answer was: ${questionArray[count][1]}`)
            $("#right-answer")[0].style.display = "block";
            //display answer

            //countdown to next question
            clearInterval(interval);
            time = 5;
            displayTime();
            count++;
            // console.log(`count: ${count}`);
            interval = setInterval(function () {
                if (time <= 0) {
                    clearInterval(interval);
                    console.log("clearInterval");
                    $("#right-answer div:first-child").text("");
                    $("#right-answer")[0].style.display = "none";
                    //display next question
                    newQuestion();
                } else {
                    time--;
                    displayTime();
                }
            }, 1000);
        } else {
            time--;
            displayTime();
        }
    }, 1000);
}

function randomizeAnswers() {
    console.log(`count: ${count}`);
    var newQuestion = questionArray[count];
    console.log(`newQuestion: ${newQuestion}`);

    //creating an array with numbers 1-4 in randomized order
    var arr = [];
    for (var i = 1; i < newQuestion.length; i++) {
        var rand = Math.floor(Math.random() * (arr.length + 1));
        arr.splice(rand, 0, i);
    }
    console.log(arr);

    //Assigning all values of answers to false
    $("#answer1").val(0);
    $("#answer2").val(0);
    $("#answer3").val(0);
    $("#answer4").val(0);

    //Assigning text for question and answers based on randomized array
    $("#question").text(newQuestion[0]);
    $("#answer1").text(newQuestion[arr[0]]);
    $("#answer2").text(newQuestion[arr[1]]);
    $("#answer3").text(newQuestion[arr[2]]);
    $("#answer4").text(newQuestion[arr[3]]);


    //Finding the currect answer and setting value to true
    if (arr[0] == 1) {
        $("#answer1").val(1);
    } else if (arr[1] == 1) {
        $("#answer2").val(1);
    } else if (arr[2] == 1) {
        $("#answer3").val(1);
    } else if (arr[3] == 1) {
        $("#answer4").val(1);
    } else {
        console.log("Error: correct answer not available")
    }

}

function newQuestion() {
    if (count < questionArray.length) {
        time = 30;
        displayTime();
        startTimer();

        $("#answers-container")[0].style.display = "block";

        randomizeAnswers();

    } else {
        //Show Final Screen
        console.log("Final Screen")

        $("#question").text("All done, here's how you did!");
        $("#answers-correct").text(`Correct Answers: ${correct}`);
        $("#answers-incorrect").text(`Incorrect Answer: ${incorrect}`);
        $("#answers-blank").text(`Blank Answer: ${unanswered}`);
        $("#start").text("Start Over?");
        $("#timer").empty();

        $("#answers-correct")[0].style.display = "block";
        $("#answers-incorrect")[0].style.display = "block";
        $("#answers-blank")[0].style.display = "block";
        $("#start")[0].style.display = "block";

        $("#answers-container")[0].style.display = "none";
    }
}

function displayAnswer() {

}

$("#start").on("click", function () {
    $("#start")[0].style.display = "none";

    $("#answers-correct")[0].style.display = "none";
    $("#answers-incorrect")[0].style.display = "none";
    $("#answers-blank")[0].style.display = "none";

    count = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;

    newQuestion();
});

$(".answer").on("click", function () {

    $("#answers-container")[0].style.display = "none";

    //correct or incorrect
    var ans = $(this).val();
    console.log(ans);

    if (ans == 1) {
        $("#question").text("Correct!");
        correct++;
    } else {
        incorrect++;
        $("#question").text("Incorrect!");
        $("#right-answer div:first-child").text(`The Correct Answer was: ${questionArray[count][1]}`)
    }

    // console.log($("#right-answer"));
    $("#right-answer")[0].style.display = "block";

    //countdown to next question
    clearInterval(interval);
    time = 5;
    displayTime();
    count++;
    console.log(`count: ${count}`);
    interval = setInterval(function () {
        if (time <= 0) {
            clearInterval(interval);
            console.log("clearInterval");
            $("#right-answer div:first-child").text("");
            $("#right-answer")[0].style.display = "none";
            //display next question
            newQuestion();
        } else {
            time--;
            displayTime();
        }
    }, 1000);
});