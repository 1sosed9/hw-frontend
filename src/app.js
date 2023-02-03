function Auto(brand, model, createdYear, vinCode) {
    this.brand = brand;
    this.model = model;
    this.createdYear = createdYear;
    this.vinCode = vinCode;
}

let auto = new Auto("Audi", "A-4", 2023, "1234567891234567");

Auto.prototype.log = function () {
    return `Auto {
        brand: ${this.brand}, 
        model: ${this.model},
        createdYear = ${this.createdYear}
        }`;
}

let arr = [1, 2, 3, 4];

Auto.prototype.checkVin = function () {
    return this.vinCode.length === 16 ? true : false;
}

function Auto_Fuel(brand, model, createdYear, vinCode, engineСapacity, consumptionLiters) {
    this.brand = brand;
    this.model = model;
    this.createdYear = createdYear;
    this.vinCode = vinCode;
    this.engineСapacity = engineСapacity;
    this.consumptionLiters = consumptionLiters;
}

Auto_Fuel.prototype = Object.create(Auto.prototype);

Auto_Fuel.prototype.showFuelConsumption = function () {
    return console.log`
    Auto_Fuel {
        engineСapacity: ${this.engineСapacity},
        consumptionLiters: ${this.consumptionLiters}
    }`;
}

let bmwX_1 = new Auto_Fuel("BMW", "X-1", 2018, "234567891234567", "2.0", 10);

function Auto_Electric(brand, model, createdYear, vinCode, batteryСapacity) {
    this.brand = brand;
    this.model = model;
    this.createdYear = createdYear;
    this.vinCode = vinCode;
    this.batteryСapacity = batteryСapacity;
}
Auto_Electric.prototype = Object.create(Auto.prototype);

Auto_Electric.prototype.showBatteryConfig = function () {
    return this.batteryСapacity;
}

let nissanLeaf = new Auto_Electric("Nissan", "Leaf", 2017, "1234567891234568", 100);

let infoAboutCar = nissanLeaf.log();
console.log(infoAboutCar);

let vinNissan = nissanLeaf.checkVin();
console.log(vinNissan);

let showBatteryConfig = nissanLeaf.showBatteryConfig();
console.log(showBatteryConfig);

