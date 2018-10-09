let questionNum = 1;
let correctNum = 0;
let incorrectNum = 0;
let questionIndex = 0;
function createQuestion() {
  if (questionIndex < 10) {
    let questions = '';
    for(let i = 0; i < STORE[questionIndex].answers.length; i++){
      questions += `<div class="answer-div"> 
              <label for="answer${i}">${STORE[questionIndex].answers[i]}</label>
              <input type="radio" name="answer" id="answer${i}" value="${STORE[questionIndex].answers[i]}" required/>
            </div>`
    }
    return `<p class="question col-8">${STORE[questionIndex].question}</p>
      <section role="region">
        <form class="col-6 js-answer-form">
          <fieldset>
          <legend>Question ${questionNum}</legend>
          ${questions}
          </fieldset>
          <button>Submit</button>
        </form>
        <div class="score-index-div col-4">
          <span class="score">Correct: ${correctNum}, Incorrect: ${incorrectNum}</span>
        </div>
      
      </section>`;

  } else {
    showResults();
  }
}

function alertCorrect() { 
  if (questionIndex < 9) {
    return `<form class="next-question-form"><h2>Nice Job!</h2><p>Let's go for the next one</p><input type="submit" value="Next Question" class="next-question-button" role="button"/></form>`;
  } else {
    return `<form class="next-question-form"><h2>Nice Job!</h2><p>Let's see how you did...</p><input type="submit" value="See Results" class="next-question-button" role="button"/></form>`;
  }
}

function answerFocus() {
  $('.js-quiz-form').on('focus', [type='radio'], function() {
    $(this).parent().addClass('answer-div-focus');
  });
}

answerFocus();

function alertIncorrect() {
  if (questionIndex < 9) {
    return `<form class="next-question-form"><p>Nope, the correct answer was ${STORE[questionIndex].correct}</p><input type="submit" value="Next Question" class="next-question-button" role="button"/></form>`;
  } else {
    return `<form class="next-question-form"><p>Nope, the correct answer was ${STORE[questionIndex].correct}</p><input type="submit" value="See Results" class="next-question-button" role="button"/></form>`;
  }
}

function calculateScore(correctNum) {
  return (correctNum/10) * 100 + '%';
}

function resultsMessage() {
  if (correctNum === 10) {
    return `<div class="result-div"><h2 class="perfect-results">Whoa!</h2><p class="results-paragraph">You need a job in the front office. You scored <span class="score-percentage">${calculateScore(correctNum)}!</span></p><button class="restart-button" role="button">Try Again?</button></div>`;
  } else if (correctNum < 10 && correctNum >= 8) {
    return `<div class="result-div"><p class="results-paragraph">Nice to meet a real Sox fan! You scored a <span class="score-percentage">${calculateScore(correctNum)}</span></p><button class="restart-button" role="button">Try Again?</button></div>`;
  } else if (correctNum < 8 && correctNum >= 5) {
    return `<div class="result-div"><p class="results-paragraph">Not a three run Johnson... but not bad. You got a <span class="score-percentage">${calculateScore(correctNum)}</span></p><button class="restart-button" role="button">Try Again?</button></div>`;
  } else if (correctNum < 5 && correctNum >= 3) {
    return `<div class="result-div"><p class="results-paragraph">You don't watch much baseball do you... You got a <span class="score-percentage">${calculateScore(correctNum)}</span></p><button class="restart-button" role="button">Try Again?</button></div>`
  } else {
    return `<div class="result-div"><p class="results-paragraph">Why did you take this quiz? You scored a disappointing <span class="score-percentage">${calculateScore(correctNum)}</span></p><button class="restart-button" role="button">Try Again?</button></div>`;
  }

}

function startQuiz() {
  $('.js-start-button').click(function(e){
    $('.intro-div').remove();
    $('.js-quiz-form').html(createQuestion());
  });
}

function answerSubmit() {

  $('.js-quiz-form').on('submit', '.js-answer-form', function(event){
    event.preventDefault();
    if($(this).find("[type='radio']:checked").attr('value') === STORE[questionIndex].correct) {
      correctNum ++;
      userAnswerCorrect();
      increaseQuestionNumber();
      increaseQuestionIndex();
    } else {
      incorrectNum ++;
      userAnswerIncorrect();
      increaseQuestionNumber();
      increaseQuestionIndex();
    }
  });
  goToNextQuestion();
}

function userAnswerCorrect() {
  $('.js-quiz-form').empty().html(alertCorrect());
}

function userAnswerIncorrect() {
  $('.js-quiz-form').empty().html(alertIncorrect());
}

function createNextQuestion() {
  //goToNextQuestion();
  event.preventDefault();
  $('.js-quiz-form').empty();
  $('.js-quiz-form').append(createQuestion());
}

function increaseQuestionNumber() {
  questionNum ++;
}

function increaseQuestionIndex() {
  questionIndex ++;
}


function goToNextQuestion() {
  $('.next-question-form').submit(function(event){
    event.preventDefault();
    createNextQuestion();
  });
}

function nextQuestion() {
  $('.js-quiz-form').on('click', '.next-question-button', function(event){
    event.preventDefault();
    $('.next-question-form').remove();
    $('.js-quiz-form').append(createQuestion());
  });
}

function showResults() {
  $('.js-quiz-form').empty().html(resultsMessage());
}

function restartQuiz() {
  $('.js-quiz-form').on('click', '.restart-button', function(event){
    event.preventDefault();
    startQuiz();
  });
}

function renderQuiz() {
  startQuiz();
  answerSubmit();
  nextQuestion();
  restartQuiz();
}

renderQuiz();