function BudgetsService(Budget) {
  this.getAll = function () {
    return Budget.find().$promise;
  };

  this.getById = function (id) {
    return Budget.findById({ id }).$promise;
  };

  this.create = function (data) {
    return Budget.create(data).$promise;
  };

  this.update = function (id, data) {
    return Budget.prototype$updateAttributes({ id }, data).$promise;
  };

  this.remove = function (id) {
    return Budget.deleteById({ id }).$promise;
  };
}

BudgetsService.$inject = ["Budget"];

export default BudgetsService;
