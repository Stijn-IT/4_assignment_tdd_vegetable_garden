const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
} = require("./farm");

// GET YIELD FOR PLANT

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  // test 1 GetYieldForPlant NO environment factors (for costs you have no environmentfactors)

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  // test 2 GetYieldForPlant WITH environment factors

  test("Get yield for plant including environment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    // environmentfactors:

    const sunLow = {
      sun: "low",
    };
    const sunMedium = {
      sun: "medium",
    };
    const sunHigh = {
      sun: "high",
    };
    const windLow = {
      wind: "low",
    };
    const windMedium = {
      wind: "medium",
    };
    const windHigh = {
      wind: "high",
    };
    const moreEnvironmentFactors = {
      sun: "low",
      wind: "high",
    };
    expect(getYieldForPlant(corn, sunLow)).toBe(15);
    expect(getYieldForPlant(corn, sunMedium)).toBe(30);
    expect(getYieldForPlant(corn, sunHigh)).toBe(45);
    expect(getYieldForPlant(corn, windLow)).toBe(30);
    expect(getYieldForPlant(corn, windMedium)).toBe(21);
    expect(getYieldForPlant(corn, windHigh)).toBe(12);
    expect(getYieldForPlant(corn, moreEnvironmentFactors)).toBe(6);
  });
});

// GET YIELD FOR CROP

describe("getYieldForCrop", () => {
  // test 1 getYieldForCrop NO environment factors

  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });

  // test 2 getYieldForCrop WITH environment factors

  test("Get yield for crop, including environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 12,
    };
    const moreEnvironmentFactors = {
      sun: "low",
      wind: "high",
    };
    const moreEnvironmentFactors2 = {
      sun: "medium",
      wind: "low",
    };
    expect(getYieldForCrop(input, moreEnvironmentFactors)).toBeCloseTo(7.2);
    expect(getYieldForCrop(input, moreEnvironmentFactors2)).toBeCloseTo(36);
  });
});

// GET TOTAL YIELD

describe("getTotalYield", () => {
  // test 1 yield with multiple crops, NO environment factors

  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBeCloseTo(23);
  });

  // test 2 total yield with 0 amount

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });

  // test 3 total yield with multiple crops, WITH environment factors

  test("Calculate total yield with multiple crops, with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const moreEnvironmentFactors = {
      sun: "low",
      wind: "high",
    };
    const moreEnvironmentFactors2 = {
      sun: "medium",
      wind: "low",
    };
    expect(getTotalYield({ crops }, moreEnvironmentFactors)).toBeCloseTo(4.6);
    expect(getTotalYield({ crops }, moreEnvironmentFactors2)).toBeCloseTo(23);
  });

  // test 4 total yield multiple crops, more plants, other plants, WITH changing environment factors

  test("Calculate total yield multiple crops, more plants, other plants, changing factors", () => {
    const strawberry = {
      name: " strawberry",
      yield: 0.5,
      factor: {
        sun: {
          low: -30,
          medium: 0,
          high: 70,
        },
        wind: {
          low: 20,
          medium: -30,
          high: -70,
        },
      },
    };
    const chiliPepper = {
      name: "chili pepper",
      yield: 1.5,
      factor: {
        sun: {
          low: -70,
          medium: 0,
          high: 80,
        },
        wind: {
          low: 0,
          medium: -10,
          high: -30,
        },
      },
    };
    const apple = {
      name: "apple",
      yield: 25,
      factor: {
        sun: {
          low: 0,
          medium: 20,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -10,
          high: -20,
        },
      },
    };
    const crops = [
      { crop: strawberry, numCrops: 30 },
      { crop: chiliPepper, numCrops: 50 },
      { crop: apple, numCrops: 30 },
    ];
    const moreEnvironmentFactors = {
      sun: "high",
      wind: "medium",
    };
    expect(getTotalYield({ crops }, moreEnvironmentFactors)).toBeCloseTo(
      1151.85
    );
  });
});

// GET COST FOR CROP

describe("getCostsForCrop", () => {
  // test 1 total costs for multiple crops, NO environment factors (for costs you never have environmentfactors)

  test("Calculate cost for crops, NO environment factors: ", () => {
    const corn = {
      name: "corn",
      cost: 2,
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      cost: 3,
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getCostsForCrop({ crops })).toBeCloseTo(16);
  });
});

// REVENUE FOR CROP

describe("getRevenueForCrop", () => {
  // test 1 Revenue with multiple crops NO environment
  test("Calculate revenue for crops NO environment factors", () => {
    const corn = {
      name: "corn",
      cost: 2,
      salePrice: 5,
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      cost: 3,
      salePrice: 7,
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getRevenueForCrop({ crops })).toBeCloseTo(131);
  });
  // test 2 Revenue with multiple crops WITH environment
  test("Calculate revenue for crop or total revenue WITH environment factors", () => {
    const corn = {
      name: "corn",
      cost: 2,
      salePrice: 5,
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      cost: 3,
      salePrice: 7,
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const moreEnvironmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getRevenueForCrop({ crops }, moreEnvironmentFactors)).toBeCloseTo(
      78.6
    );
  });
});

describe("getprofitForCrop", () => {
  // test 1 Profit for crop NO environment

  test("Calculate profit for crops NO environment factors", () => {
    const corn = {
      name: "corn",
      cost: 2,
      salePrice: 5,
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      cost: 3,
      salePrice: 7,
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getProfitForCrop({ crops })).toBeCloseTo(77);
  });

  // test 2 total profit WITH environment factors

  test("Calculate profit for crops WITH environment factors", () => {
    const corn = {
      name: "corn",
      cost: 2,
      salePrice: 5,
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      cost: 3,
      salePrice: 7,
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const moreEnvironmentFactors = {
      sun: "high",
      wind: "high",
    };
    const moreEnvironmentFactors2 = {
      sun: "medium",
      wind: "medium",
    };
    expect(getProfitForCrop({ crops }, moreEnvironmentFactors)).toBeCloseTo(
      46.2
    );
    expect(getProfitForCrop({ crops }, moreEnvironmentFactors2)).toBeCloseTo(
      53.9
    );
  });
});
