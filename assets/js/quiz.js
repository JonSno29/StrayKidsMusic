/* Variables */
var startBtn = document.querySelector("#start-button");
var timer = document.querySelector(".timer");
var highScoreBtn = document.querySelector("#highscore-button");
var question = document.querySelector("#question");
var assessQuestions = document.querySelector("#assess-questions");
var multipleChoice = document.querySelector("#multiple-choice");
var answer = document.querySelector("#answer");
var choiceA = document.querySelector("#multiple-choice-A");
var choiceB = document.querySelector("#multiple-choice-B");
var choiceC = document.querySelector("#multiple-choice-C");
var choiceD = document.querySelector("#multiple-choice-D");
var checkAnswerIncorrect = document.querySelector(".check-answer-incorrect");
var checkAnswerCorrect = document.querySelector("#check-answer-correct");
var scoreBtn = document.querySelector("#score-button");
var inputScore = document.querySelector("#input-score");
var initialsBox = document.querySelector("#initials-box");
var highScore = document.querySelector("#high-score");
var backBtn = document.querySelector("#back-button");
var submitBtn = document.querySelector("#submit-button");
var clearBtn = document.querySelector("#clear-button");
var start = document.querySelector(".start");
var questionContainer = document.querySelector(".main");
questionContainer.style.display = "none";
/* Fin Variables*/
(function ($) {
  var $window = $(window),
    $body = $("body");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Touch?
  if (browser.mobile) $body.addClass("is-touch");

  // Forms.
  var $form = $("form");

  // Auto-resizing textareas.
  $form.find("textarea").each(function () {
    var $this = $(this),
      $wrapper = $('<div class="textarea-wrapper"></div>'),
      $submits = $this.find('input[type="submit"]');

    $this
      .wrap($wrapper)
      .attr("rows", 1)
      .css("overflow", "hidden")
      .css("resize", "none")
      .on("keydown", function (event) {
        if (event.keyCode == 13 && event.ctrlKey) {
          event.preventDefault();
          event.stopPropagation();

          $(this).blur();
        }
      })
      .on("blur focus", function () {
        $this.val($.trim($this.val()));
      })
      .on("input blur focus --init", function () {
        $wrapper.css("height", $this.height());

        $this
          .css("height", "auto")
          .css("height", $this.prop("scrollHeight") + "px");
      })
      .on("keyup", function (event) {
        if (event.keyCode == 9) $this.select();
      })
      .triggerHandler("--init");

    // Fix.
    if (browser.name == "ie" || browser.mobile)
      $this.css("max-height", "10em").css("overflow-y", "auto");
  });

  // Menu.
  var $menu = $("#menu");

  $menu.wrapInner('<div class="inner"></div>');

  $menu._locked = false;

  $menu._lock = function () {
    if ($menu._locked) return false;

    $menu._locked = true;

    window.setTimeout(function () {
      $menu._locked = false;
    }, 350);

    return true;
  };

  $menu._show = function () {
    if ($menu._lock()) $body.addClass("is-menu-visible");
  };

  $menu._hide = function () {
    if ($menu._lock()) $body.removeClass("is-menu-visible");
  };

  $menu._toggle = function () {
    if ($menu._lock()) $body.toggleClass("is-menu-visible");
  };

  $menu
    .appendTo($body)
    .on("click", function (event) {
      event.stopPropagation();
    })
    .on("click", "a", function (event) {
      var href = $(this).attr("href");

      event.preventDefault();
      event.stopPropagation();

      // Hide.
      $menu._hide();

      // Redirect.
      if (href == "#menu") return;

      window.setTimeout(function () {
        window.location.href = href;
      }, 350);
    })
    .append('<a class="close" href="#menu">Close</a>');

  $body
    .on("click", 'a[href="#menu"]', function (event) {
      event.stopPropagation();
      event.preventDefault();

      // Toggle.
      $menu._toggle();
    })
    .on("click", function (event) {
      // Hide.
      $menu._hide();
    })
    .on("keydown", function (event) {
      // Hide on escape.
      if (event.keyCode == 27) $menu._hide();
    });
})(jQuery);
/* Number Variables */
var timeLeft = 60;
var i = 0;
var s = 0;
var selection = 0;
var score = 0;
var scoreList = [];
var setTimeInterval;
loadScore();

/* Questions Array */
var questionArray = [
  {
    question: "What was Melanie Martinez's first song in the Crybaby album?",
    selection: ["Highschool Sweet Heart", "Spiderweb", "Crybaby", "Mad Hatter"],
    answer: "Crybaby",
  },
  {
    question: "What was Melanie Martinez's forth album?",
    selection: ["Crybaby", "K-12", "After School", "Portals"],
    answer: "After School",
  },
  {
    question:
      "Which album has the song Teachers Pet?",
    selection: ["K-12", "Crybaby", "Portals", "After School"],
    answer: "K-12",
  },
  {
    question: "In was album does Melanie Martinez become a fariy?",
    selection: [
      "Crybaby",
      "K-12",
      "After School",
      "Portals",
    ],
    answer: "Portals",
  },
  {
    question: "What song is in the After School album?",
    selection: [
      "The Bakery",
      "Glued",
      "Test Me",
      "All the Above",
    ],
    answer: "All the Above",
  },
  {
    question: "Which song is not in the Portals album?",
    selection: ["Death", "Void", "Notebook", "Fairee Soiree"],
    answer: "Notebook",
  },
  {
    question: "Milk and Cookie is in the ______ album?",
    selection: [
      "After School",
      "K-12",
      "Portlals",
      "Crybaby",
    ],
    answer: "Crybaby",
  },
  {
    question:
      "What song is not in the K-12 album?",
    selection: ["Wheels on the bus", "Light Shower", "Detention", "Lunchbox Friends"],
    answer: "Light Shower",
  },
  {
    question:
      "Which song is not by Melanie Martinez?",
    selection: ["Angry Too", "Nurse's Office", "Numbers", "The Bakery"],
    answer: "if(a!==null)",
  },
  {
    question:
      "Which songs are in the Crybaby album?",
    selection: ["Womb", "Numbers", "Highschool Sweet Heart", "None of the above"],
    answer: "None of the above",
  },
];
/* Fin Qand A */
/* display question and answer function */
function displayAssessment() {
  if (i < questionArray.length) {
    question.textContent = questionArray[i].question;
    choiceA.textContent = questionArray[i].selection[0];
    choiceB.textContent = questionArray[i].selection[1];
    choiceC.textContent = questionArray[i].selection[2];
    choiceD.textContent = questionArray[i].selection[3];
  } else {
    endAssessment();
    console.log(call.Assessment);
  }
}

/* Start Assessment Timer */
function startTimer() {
  setTimeInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = "Timer: " + timeLeft;

    if (timeLeft < 0 || i >= questionArray) {
      clearInterval(setTimeInterval);
      endAssessment();
    }
  }, 1000);
}

/* Correct/Incorrect Answer Function */
function answerSelection(event) {
  if (i >= questionArray.length) {
    endAssessment();
    clearInterval(setTimeInterval);
  } else {
    if (event === questionArray[i].answer) {
      checkAnswerCorrect.textContent = "CORRECT!";
    } else {
      timeLeft -= 10;
      checkAnswerIncorrect.textContent = "Incorrect";
    }
    score = timeLeft;
    i++;
    displayAssessment();
  }
}

/* End Assessment Function */
function endAssessment() {
  scoreBtn.innerHTML = score;
  assessQuestions.classList.add("hide");
  inputScore.classList.remove("hide");
  timer.classList.add("hide");
  highScoreBtn.classList.add("hide");
  scoreBoard();
}

/* retrieve scores from localStorage function and save highscore to localstorage function*/
function loadScore() {
  var savedScore = JSON.parse(localStorage.getItem("highScore"));
  if (savedScore !== null) {
    scoreList = savedScore;
  }
}

function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}

/* top scores tracker function */
function scoreBoard() {
  clearScoreBoard();
  addScoreBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });

  topScores = scoreList.slice(0, 5);

  for (var s = 0; s < topScores.length; s++) {
    var user = topScores[s].user;
    var userScore = topScores[s].score;

    var newDiv = document.createElement("div");
    scoreBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = user + ":" + userScore;
    newDiv.appendChild(newLabel);
  }
}

/* add user initials to scoreboard function */
function addScoreBoard() {
  scoreBoardDiv = document.createElement("div");
  scoreBoardDiv.setAttribute("id", "userInitials");
  document.getElementById("scoreBoard").appendChild(scoreBoardDiv);
}

/* clear score board function */
function clearScoreBoard() {
  var clearScores = document.getElementById("userInitials");
  if (clearScores !== null) {
    clearScores.remove();
  }
}

/* Event Listeners */
startBtn.addEventListener("click", function (event) {
  startTimer();
  displayAssessment();
  start.classList.add("hide");
  assessQuestions.classList.remove("hide");
  highScoreBtn.style.display = "none";
  highScore.classList.add("hide");
  questionContainer.style.display = "block";
});

multipleChoice.addEventListener("click", function (event) {
  var event = event.target;
  answerSelection(event.textContent.trim());
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var userInitials = initialsBox.value.trim();
  var newScore = {
    user: userInitials,
    score: score,
  };

  scoreList.push(newScore);
  saveScore();
  scoreBoard();
  inputScore.classList.add("hide");
  highScore.classList.remove("hide");
});

highScoreBtn.addEventListener("click", function (event) {
  highScore.classList.remove("hide");
  highScoreBtn.classList.add("hide");
  start.classList.add("hide");
  scoreBoard();
});

backBtn.addEventListener("click", function (event) {
  location.reload();
});

clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  scoreBoard();
  saveScore();
});
