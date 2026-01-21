import angular from "angular";
const moduleName = "app.budgets";
angular.module(moduleName, []);

require("./budgets.routes");
const BudgetsListController =
  require("./controllers/budgets.list.controller").default;
const BudgetDetailController =
  require("./controllers/budgets.detail.controller").default;
const BudgetsService = require("./services/budgets.service").default;

angular
  .module(moduleName)
  .controller("BudgetsListController", BudgetsListController)
  .controller("BudgetDetailController", BudgetDetailController)
  .service("BudgetsService", BudgetsService);

export default moduleName;
