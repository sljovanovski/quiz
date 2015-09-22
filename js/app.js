var app = angular.module('quizApp', ['ngAnimate', 'ngRoute']);

//mock up for questions
var questions = [
    {
        id: 1,
        title: "How many teaspoons of sugar are in this drink?",
        meal: "Iced Milo",
        measurement: "teaspoons",
        image: "images/milo.jpg",
        replacement: "Milo less sweet 3.5 teaspoons of sugar per 250ml.",
        replacementImage: "images/miloless.jpg",
        min: 0,
        max: 10,
        step: 1,
        answerTitle: "Iced Milo contains 5 teaspoons of sugar.",
        answer: 5
    },
    {
        id: 2,
        title: "How many calories has this meal?",
        meal: "Nuraini Chicken Rice",
        measurement: "calories",
        image: "images/rice.jpg",
        replacement: "Roasted Chicken Rice, 500 calories per portion.",
        replacementImage: "images/roasted.png",
        min: 100,
        max: 1000,
        step: 50,
        answerTitle: "Nuraini Chicken Rice contains 750 calories per portion.",
        answer: 750
    },
    {
        id: 3,
        title: "How much proteins has this type of fish?",
        meal: "Rainbow Trout",
        measurement: "grams of protein",
        image: "images/rainbow.jpg",
        replacement: "Salmon, contains 23 grams of proteins per portion.",
        replacementImage: "images/salmon.jpg",
        min: 1,
        max: 100,
        step: 1,
        answerTitle: "Rainbow Trout contains 20 grams of proteins per portion.",
        answer: 20
    }
];
var correctAnswers = [];
var wrongAnswers = [];

app.config(
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/question/:questionId", {
                templateUrl: "question.html",
                controller: "QuestionCtrl",
                controllerAs: "quesiton"
            })
            .when("/question/:questionId/answer/:answerIs", {
                templateUrl: "answer.html",
                controller: "AnswerCtrl",
                controllerAs: "answer"
            })
            .when("/final", {
                templateUrl: "final.html",
                controller: "FinalCtrl",
                controllerAs: "final"
            })
            .otherwise({
                redirectTo: '/question/1'
            });

        $locationProvider.html5Mode(true);
    });