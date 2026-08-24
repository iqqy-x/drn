export class DeliveryPackage {
  constructor(houses) { this.previousHouseId = null; this.assign(houses); }
  assign(houses) {
    const options = houses.filter((house) => house.id !== this.previousHouseId);
    const house = options[Math.floor(Math.random() * options.length)] || houses[0];
    this.previousHouseId = house.id;
    this.targetHouseId = house.id;
    this.color = house.color;
    this.targetName = house.name;
  }
}
