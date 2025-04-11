"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
class AmericanoDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    get name() {
        return this.coffee.name;
    }
    get type() {
        return this.coffee.type;
    }
    get cost() {
        return this.coffee.cost;
    }
}
class EspressoDecorator extends AmericanoDecorator {
    constructor(coffee) {
        super(coffee);
        this.espresso = coffee;
    }
    get name() {
        return `${this.espresso.name} Espresso`;
    }
    get type() {
        return this.espresso.type;
    }
    get cost() {
        return this.espresso.cost + 1.5;
    }
}
class MilkDecorator extends AmericanoDecorator {
    constructor(coffee) {
        super(coffee);
    }
    get name() {
        return `${super.name} with Milk`;
    }
    get cost() {
        return super.cost + 0.5;
    }
}
class SugarDecorator extends AmericanoDecorator {
    constructor(coffee) {
        super(coffee);
    }
    get name() {
        return `${super.name} with Sugar`;
    }
    get cost() {
        return super.cost + 0.2;
    }
}
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter base coffee name (e.g., Espresso, Americano): ", (name) => {
        const baseCoffee = { name: name, type: "Hot", cost: 2.5 };
        if (name == "Americano") {
            baseCoffee.cost = 1.25;
        }
        else {
            baseCoffee.cost = 2.5;
        }
        if (["Cold", "Frappuccino", "Ice"].some((word) => name.includes(word))) {
            baseCoffee.type = "Cold";
        }
        let order = new AmericanoDecorator(baseCoffee);
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
    });
}
main();
