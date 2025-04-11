import * as readline from "readline";

// Coffee System using Decorator Design Pattern
// Based on https://www.youtube.com/watch?v=P-9fXUbQIYw

interface Coffee {
  name: string;
  type: string;
  cost: number;
}

class CoffeeDecorator implements Coffee {
  private coffee: Coffee;
  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  get name(): string {
    return this.coffee.name;
  }

  get type(): string {
    return this.coffee.type;
  }

  get cost(): number {
    return this.coffee.cost;
  }
}

class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  get name(): string {
    return `${super.name} with Milk`;
  }

  get cost(): number {
    return super.cost + 0.5;
  }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  get name(): string {
    return `${super.name} with Sugar`;
  }

  get cost(): number {
    return super.cost + 0.2;
  }
}


function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Enter base coffee name (e.g., Espresso, Americano): ",
    (name) => {
      const baseCoffee: Coffee = { name: name, type: "Hot", cost: 2.5 };

      if (name == "Americano") {
        baseCoffee.cost = 1.25;
      } else {
        baseCoffee.cost = 2.5;
      }
      if (["Cold", "Frappuccino", "Ice"].some((word) => name.includes(word))) {
        baseCoffee.type = "Cold";
      }

      let order: Coffee = new CoffeeDecorator(baseCoffee);

      rl.question("Would you like to add milk? (y/n): ", (milkAns) => {
        if (milkAns.toLowerCase() === "y") {
          order = new MilkDecorator(order); // Add milk (incluiding cost)
        }
        rl.question("Would you like to add sugar? (y/n): ", (sugarAns) => {
          if (sugarAns.toLowerCase() === "y") {
            order = new SugarDecorator(order);
          }
          console.log(`Your order: ${order.name}`);
          console.log(`Type: ${order.type}`);
          console.log(`Cost: $${order.cost.toFixed(2)}`);
          rl.close();
        });
      });
    }
  );
}

main();
