function BudgetDetailController(BudgetsService, $stateParams, $state) {
  const vm = this;

  vm.budget = {
    name: "",
    thumbnail: "",
    date: new Date(),
    clientName: "",
    totalCost: 0,
    totalSale: 0,
    chapters: [],
  };

  vm.isEdit = !!($stateParams.id && $stateParams.id !== "new");

  if (vm.isEdit) {
    BudgetsService.getById($stateParams.id).then((res) => {
      vm.budget = res;
    });
  }

  vm.save = function () {
    vm.updateTotals();
    const action = vm.isEdit
      ? BudgetsService.update(vm.budget.id, vm.budget)
      : BudgetsService.create(vm.budget);

    action.then(() => {
      $state.go("budgets");
    });
  };

  vm.cancel = function () {
    $state.go("budgets");
  };

  vm.addChapter = function () {
    const newChapter = {
      rank: vm.budget.chapters.length + 1,
      description: "",
      saleCoefMaterial: 1.0,
      saleCoefLabour: 1.0,
      totalCost: 0,
      totalSale: 0,
      batches: [],
    };
    vm.budget.chapters.push(newChapter);
    vm.updateTotals();
  };

  vm.deleteChapter = function (chapter) {
    const idx = vm.budget.chapters.indexOf(chapter);
    if (idx > -1) {
      vm.budget.chapters.splice(idx, 1);

      vm.budget.chapters.forEach((c, i) => (c.rank = i + 1));
      vm.updateTotals();
    }
  };

  vm.addBatch = function (chapter) {
    chapter.batches = chapter.batches || [];
    const newBatch = {
      rank: chapter.batches.length + 1,
      description: "",
      amount: 1,
      materialCost: 0,
      labourCost: 0,
      unitaryCost: 0,
      totalCost: 0,
      unitarySale: 0,
      totalSale: 0,
    };
    chapter.batches.push(newBatch);
    vm.updateTotals();
  };

  vm.deleteBatch = function (chapter, batch) {
    const idx = (chapter.batches || []).indexOf(batch);
    if (idx > -1) {
      chapter.batches.splice(idx, 1);
      chapter.batches.forEach((b, i) => (b.rank = i + 1));
      vm.updateTotals();
    }
  };

  vm.updateTotals = function () {
    let budgetTotalCost = 0;
    let budgetTotalSale = 0;

    (vm.budget.chapters || []).forEach((chapter) => {
      let chapterTotalCost = 0;
      let chapterTotalSale = 0;
      chapter.batches = chapter.batches || [];

      chapter.batches.forEach((batch) => {
        const amount = Number(batch.amount) || 0;
        const material = Number(batch.materialCost) || 0;
        const labour = Number(batch.labourCost) || 0;
        const unitary = material + labour;
        const matCoef = Number(chapter.saleCoefMaterial) || 1;
        const labCoef = Number(chapter.saleCoefLabour) || 1;
        const unitarySale = material * matCoef + labour * labCoef;
        const totalCost = unitary * amount;
        const totalSale = unitarySale * amount;

        batch.unitaryCost = unitary;
        batch.unitarySale = unitarySale;
        batch.totalCost = totalCost;
        batch.totalSale = totalSale;

        chapterTotalCost += totalCost;
        chapterTotalSale += totalSale;
      });

      chapter.totalCost = chapterTotalCost;
      chapter.totalSale = chapterTotalSale;

      budgetTotalCost += chapterTotalCost;
      budgetTotalSale += chapterTotalSale;
    });

    vm.budget.totalCost = budgetTotalCost;
    vm.budget.totalSale = budgetTotalSale;
  };
}

BudgetDetailController.$inject = ["BudgetsService", "$stateParams", "$state"];

export default BudgetDetailController;
