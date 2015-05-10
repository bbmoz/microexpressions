(function room() {
  var vpOutput, questionAnswerPairs, answerBtns, currentQuesAnsPair;

  vpOutput = document.getElementById('virtualperson-output');
  questionAnswerPairs = [
    { vpOutput: 'Hello, my name is Bill', correctAnswer: 'false', microexpressionImg: '' },
    { vpOutput: 'You have nice hair', correctAnswer: 'false', microexpressionImg: '' },
    { vpOutput: 'My dog is a golden retriever', correctAnswer: 'true', microexpressionImg: '' },
    { vpOutput: 'My neighbor poops in my yard', correctAnswer: 'maybe', microexpressionImg: '' },
  ];
  answerBtns = Array.prototype.slice.call(document.getElementById('answer-btns').children, 0);
  answerBtns = answerBtns.map(function (answerBtn) {
    return answerBtn.id;
  });

  function flashScreen(isCorrect) {
    var bgColor = isCorrect ? 'green' : 'red';

    document.body.style.backgroundColor = bgColor;
    setTimeout(function () {
      document.body.style.backgroundColor = 'white';
    }, 200);
  }

  function endConversation() {
    answerBtns.forEach(function (answerBtnId) {
      document.getElementById(answerBtnId).disabled = 'true';
    });

    vpOutput.innerHTML = "Goodbye, human";
  }

  function goToNextQuestion() {
    currentQuesAnsPair = questionAnswerPairs.shift();

    if (currentQuesAnsPair === undefined) {
      endConversation();
    } else {
      vpOutput.innerHTML = currentQuesAnsPair.vpOutput;
    }
  }

  answerBtns.forEach(function (answerBtnId) {
    document.getElementById(answerBtnId).addEventListener('click', function dealWithAnswer() {
      flashScreen(
        currentQuesAnsPair.correctAnswer ===
        answerBtnId.substr(0, answerBtnId.indexOf('-'))
      );

      goToNextQuestion();
    });
  });

  // start
  goToNextQuestion();
}());
