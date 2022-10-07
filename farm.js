// getYielForPlant

const getYieldForPlant = (input, environmentFactors) => {
  const plantyield = input.yield;
  if (!environmentFactors) {
    console.log(
      "RESULT yield NO environment, getYieldForPlant:",
      input.name + ":",
      plantyield,

      "kilo"
    );
    return plantyield;
  } else {
    let factorSun;
    let factorWind;
    const influence = input.factor;

    switch (environmentFactors.sun) {
      case "low":
        factorSun = (influence.sun.low + 100) / 100;
        break;
      case "medium":
        factorSun = (influence.sun.medium + 100) / 100;
        break;
      case "high":
        factorSun = (influence.sun.high + 100) / 100;
        break;
      default:
        factorSun = 1;
    }
    switch (environmentFactors.wind) {
      case "low":
        factorWind = (influence.wind.low + 100) / 100;
        break;
      case "medium":
        factorWind = (influence.wind.medium + 100) / 100;
        break;
      case "high":
        factorWind = (influence.wind.high + 100) / 100;
        break;
      default:
        factorWind = 1;
    }
    console.log(
      "RESULT, getYieldForPlant: " + input.name + ":",
      plantyield + " kilo * factorsun " + factorSun,
      "* factorwind " + factorWind,
      "=",
      (plantyield * factorSun * factorWind).toFixed(2),
      "kilo"
    );
    const yieldForPlant = plantyield * factorSun * factorWind;
    return yieldForPlant;
  }
};

// GetYieldForCrop

const getYieldForCrop = (input, environmentFactors) => {
  const yieldForCrop = getYieldForPlant(input.crop, environmentFactors);
  console.log(
    "RESULT, getYieldForCrop: ",
    input.crop.name + ":",
    yieldForCrop.toFixed(2),
    "kilo (yield) * numCrops ",
    input.numCrops,
    "=",
    (yieldForCrop * input.numCrops).toFixed(2),
    "kilo"
  );
  return yieldForCrop * input.numCrops;
};

// getTotalYield

const getTotalYield = (input, environmentFactors) => {
  let result = 0;

  input.crops.forEach((yields) => {
    const yieldForPlants = getYieldForPlant(yields.crop, environmentFactors);
    result += yieldForPlants * yields.numCrops;
    console.log(
      "RESULT total 1 crop, getTotalYield:",
      yields.crop.name + ": ",
      yieldForPlants.toFixed(2),
      "kilo (yield)",
      "*",
      "numCrops",
      yields.numCrops,
      "= ",
      (yieldForPlants * yields.numCrops).toFixed(2),
      "kilo"
    );
  });
  console.log(
    "RESULT total all crops, getTotalYield",
    result.toFixed(2),
    "kilo"
  );
  return result;
};

// getCostsForCrop

const getCostsForCrop = (costCrops) => {
  let result = 0;
  costCrops.crops.forEach((costs) => {
    result += costs.crop.cost * costs.numCrops;
    console.log(
      "RESTULT costs total for 1 crop, getCostsForCrop:",
      costs.crop.name + ":",
      "cost plant €" + costs.crop.cost,
      "* numCrops",
      costs.numCrops,
      "= €" + (costs.crop.cost * costs.numCrops).toFixed(2)
    );
  });
  const arrayTotalCosts = costCrops.crops.map((cost) => {
    return (
      cost.crop.name +
      ": total cost 1 crop: " +
      "€" +
      cost.crop.cost * cost.numCrops
    );
  });
  console.log("Array total costs:", arrayTotalCosts, "= €" + result);
  console.log("RESTULT total costs all crops, getCostsForCrop: €" + result);
  return result;
};

// getRevenueForCrop

const getRevenueForCrop = (input, environmentFactors) => {
  let result = 0;
  input.crops.forEach((revenue) => {
    const yieldForPlant = getYieldForPlant(revenue.crop, environmentFactors);
    result += yieldForPlant * revenue.crop.salePrice * revenue.numCrops;
    console.log(
      "RESULT revenue 1 crop, getRevenueForCrop: " + revenue.crop.name + ":",
      yieldForPlant.toFixed(2) +
        " kilo (yield) * €" +
        revenue.crop.salePrice.toFixed(2) +
        " salesPrice " +
        " * " +
        revenue.numCrops +
        " numCrops = €" +
        (yieldForPlant * revenue.crop.salePrice * revenue.numCrops).toFixed(2)
    );
  });
  console.log("RESULT total revenue all crops: €" + result.toFixed(2));
  return result;
};

// getProfitForCrop

const getProfitForCrop = (input, environmentFactors) => {
  let result = 0;
  input.crops.forEach((profit) => {
    const yieldForPlant = getYieldForPlant(profit.crop, environmentFactors);
    result +=
      (profit.crop.salePrice - profit.crop.cost) *
      yieldForPlant *
      profit.numCrops;

    console.log(
      "RESULT profit 1 crop, getProfitForCrop:",
      profit.crop.name + ": (€" + profit.crop.salePrice,
      "salePrice - €" + profit.crop.cost,
      "costs)",
      "*",
      yieldForPlant,
      "kilo (yield) *",
      profit.numCrops,
      "numCrops = €" +
        (
          (profit.crop.salePrice - profit.crop.cost).toFixed(2) *
          yieldForPlant.toFixed(2) *
          profit.numCrops.toFixed(2)
        ).toFixed(2)
    );
  });

  const arrayTotalProfit = input.crops.map((profit) => {
    const yieldForPlant = getYieldForPlant(profit.crop, environmentFactors);
    const namePlant = profit.crop.name;
    const salePrice = profit.crop.salePrice;
    const costss = profit.crop.cost;
    const numCrops = profit.numCrops;

    return `${namePlant}: total profit 1 crop: €${(
      (salePrice - costss) *
      yieldForPlant *
      numCrops
    ).toFixed(2)}`;
  });

  console.log("arrayTotalProfit: ", arrayTotalProfit);

  console.log(
    "RESULT, TOTAL PROFIT all crops, getProfitForCrop: ",
    "€" + result.toFixed(2)
  );

  return result;
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
};
