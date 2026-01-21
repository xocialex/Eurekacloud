module.exports = function (Budget) {
  function computeTotals(budget) {
    let budgetTotalCost = 0;
    let budgetTotalSale = 0;

    (budget.chapters || []).forEach((chapter) => {
      let chapterTotalCost = 0;
      let chapterTotalSale = 0;
      (chapter.batches || []).forEach((batch) => {
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

    budget.totalCost = budgetTotalCost;
    budget.totalSale = budgetTotalSale;
  }

  Budget.observe("before save", function (ctx, next) {
    const data = ctx.instance || ctx.data;
    if (!data) return next();
    try {
      computeTotals(data);
    } catch (err) {
      return next(err);
    }
    next();
  });
};
