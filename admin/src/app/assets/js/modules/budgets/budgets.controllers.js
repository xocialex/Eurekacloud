import angular from "angular";

angular
  .module("app.budgets")
  .controller("BudgetsController", function ($scope) {
    $scope.budgets = [];
  });
