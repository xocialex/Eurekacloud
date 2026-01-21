function BudgetsListController(BudgetsService, $state) {
  const vm = this;

  vm.budgets = [];
  vm.filters = {
    name: "",
    client: "",
    from: null,
    to: null,
  };

  vm.load = function () {
    BudgetsService.getAll().then((res) => {
      vm.budgets = res;
    });
  };

  vm.create = function () {
    $state.go("budgetDetail", { id: "new" });
  };

  vm.edit = function (id) {
    $state.go("budgetDetail", { id });
  };

  vm.delete = function (id) {
    if (confirm("Delete budget?")) {
      BudgetsService.remove(id).then(vm.load);
    }
  };

  vm.load();
}

BudgetsListController.$inject = ["BudgetsService", "$state"];

export default BudgetsListController;
