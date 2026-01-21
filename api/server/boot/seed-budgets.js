module.exports = function (app) {
  const Budget = app.models.Budget;

  const sample = [
    {
      name: "Office Renovation",
      thumbnail: "https://via.placeholder.com/150?text=Office",
      date: new Date(),
      clientName: "Acme Corp",
      chapters: [
        {
          rank: 1,
          description: "Demolition",
          saleCoefMaterial: 1.2,
          saleCoefLabour: 1.3,
          batches: [
            {
              rank: 1,
              description: "Remove walls",
              amount: 1,
              materialCost: 200,
              labourCost: 150,
            },
            {
              rank: 2,
              description: "Remove flooring",
              amount: 1,
              materialCost: 100,
              labourCost: 120,
            },
          ],
        },
        {
          rank: 2,
          description: "Construction",
          saleCoefMaterial: 1.4,
          saleCoefLabour: 1.5,
          batches: [
            {
              rank: 1,
              description: "Build walls",
              amount: 1,
              materialCost: 500,
              labourCost: 400,
            },
          ],
        },
      ],
    },
    {
      name: "Kitchen Refit",
      thumbnail: "https://via.placeholder.com/150?text=Kitchen",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      clientName: "Homeowner",
      chapters: [
        {
          rank: 1,
          description: "Cabinets",
          saleCoefMaterial: 1.3,
          saleCoefLabour: 1.2,
          batches: [
            {
              rank: 1,
              description: "Materials",
              amount: 1,
              materialCost: 800,
              labourCost: 200,
            },
          ],
        },
      ],
    },
    {
      name: "Lighting Upgrade",
      thumbnail: "https://via.placeholder.com/150?text=Lights",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
      clientName: "Retail Shop",
      chapters: [
        {
          rank: 1,
          description: "Fixtures",
          saleCoefMaterial: 1.25,
          saleCoefLabour: 1.1,
          batches: [
            {
              rank: 1,
              description: "LED fixtures",
              amount: 20,
              materialCost: 30,
              labourCost: 10,
            },
          ],
        },
      ],
    },
  ];

  Budget.count((err, count) => {
    if (err) return console.error("Error counting budgets", err);
    if (count > 0) return; // don't seed if data exists

    console.log("Seeding sample budgets...");
    sample.forEach((b) => {
      Budget.create(b, (e, created) => {
        if (e) console.error("Error creating budget", e);
        else console.log("Created budget", created.name);
      });
    });
  });
};
