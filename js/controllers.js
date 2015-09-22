//question controller
app.controller("QuestionCtrl", ['$rootScope', '$scope', '$location', '$routeParams',
    function ($rootScope, $scope, $location, $routeParams) {

        $scope.questions = [];
        //set the question pager
        for (var i = 0; i < questions.length; i++) {
            $scope.questions.push({
                num: i + 1,
                active: parseInt($routeParams.questionId) === questions[i].id ? true : false
            });
        }

        $scope.questionId = $routeParams.questionId;
        $scope.question = {};

        //get the question
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].id === parseInt($scope.questionId)) {
                $scope.question = questions[i];
                break;
            }
        }

        $scope.measurement = "0";
        $scope.range = "0";

        //on range change / on slide
        $scope.changeRange = function () {
            $scope.measurement = $scope.range;
        };
    }]);

//answers controller
app.controller("AnswerCtrl", ['$rootScope', '$scope', '$location', '$routeParams',
    function ($rootScope, $scope, $location, $routeParams) {
        var answer = $routeParams.answerIs;

        //set the next button text
        $scope.btnNext = "NEXT";

        //set the url for the next question
        $scope.next = "question/" + (parseInt($routeParams.questionId) + 1);

        //check if next question exist
        var nextQuestionExits = questions.some(function (question) {

            return question.id === (parseInt($routeParams.questionId) + 1);
        });

        //if there's no next question go to final result page
        if (!nextQuestionExits) {
            //change the next button text to finish if there are no more questions
            $scope.btnNext = "FINISH";
            $scope.next = "final";
        }

        $scope.isCorrect = false;

        $scope.question = {};
        //get the question
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].id === parseInt($routeParams.questionId)) {
                $scope.question = questions[i];
                break;
            }
        }

        //check whether the answer is correct or not
        if (parseInt(answer) === $scope.question.answer) {
            $scope.answerIs = answer;
            $scope.isCorrect = true;
        } else {
            $scope.answerIs = answer;
            $scope.isCorrect = false;
        }

        //add the answer in the result list
        $scope.answerResult = function () {
            if ($scope.isCorrect) {
                correctAnswers.push(
                    {
                        question: $scope.question,
                        answer: answer
                    }
                );
            } else {
                wrongAnswers.push(
                    {
                        question: $scope.question,
                        answer: answer
                    }
                );
            }
        };
    }]);

//final controller
app.controller("FinalCtrl", ["$scope", function ($scope) {

    $scope.correct = correctAnswers.length; //number of correct answers
    $scope.wrong = wrongAnswers.length; //number of wrong answers

    //set the correct answers text, if there's 1 answer write ANSWER else write ANSWERS
    $scope.correctAnswers = $scope.correct + " correct " + ($scope.correct === 1 ? "answer" : "answers");

    //set the wrong answers text, if there's 1 answer write ANSWER else write ANSWERS
    $scope.wrongAnswers = $scope.wrong + " wrong " + ($scope.wrong === 1 ? "answer" : "answers");

    //clear the result list
    correctAnswers = [];
    wrongAnswers = [];
}]);

//menu controller
app.controller('MenuCtrl', ["$scope",
    function ($scope) {

        $scope.menuClass = "side-menu";

        //on open menu button is clicked (mobile)
        $scope.openMenu = function () {
            $scope.menuClass = "side-menu-open";
        };

        //close menu
        $scope.closeMenu = function () {
            $scope.menuClass = "side-menu";
        };
    }]);
