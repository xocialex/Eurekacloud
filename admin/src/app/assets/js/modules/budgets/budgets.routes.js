import listUrl from "./views/budgets.list.html";
import detailUrl from "./views/budgets.detail.html";

angular.module("app.budgets").config([
  "$stateProvider",
  function ($stateProvider) {
    $stateProvider
      .state("budgets", {
        url: "/budgets",
        templateUrl: listUrl,
        controller: "BudgetsListController",
        controllerAs: "vm",
      })
      .state("budgetDetail", {
        url: "/budgets/:id",
        templateUrl: detailUrl,
        controller: "BudgetDetailController",
        controllerAs: "vm",
      });
  },
]);
