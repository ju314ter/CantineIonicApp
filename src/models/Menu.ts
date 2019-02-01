import {Boisson} from './Boisson'
import {Snack} from './Snack'
import {Dessert} from './Dessert'
import {Plat} from './Plat'

export class Menu {
    plat : Plat;
    dessert : Dessert;
    snack : Snack;
    boisson: Boisson;
    dates : Date[];
    totalCost : Number;
    constructor(dates: Date[], plat : Plat, dessert?: Dessert, snack? : Snack, boisson?: Boisson){
        this.plat = plat;
        this.dessert = dessert;
        this.snack = snack;
        this.boisson = boisson;
        this.dates = dates
        this.totalCost = this.getPrice(plat, dessert, snack, boisson);
    }

    getPrice(plat, dessert?, snack?, boisson?){
        
        let totalCost = plat.price + (dessert ? dessert.price : 0) + (snack ? snack.price : 0) + (boisson ? boisson.price : 0);
        return totalCost;
    }
}