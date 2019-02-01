import { Plat } from "./Plat";
import { Dessert } from "./Dessert";
import { Snack } from "./Snack";
import { Boisson } from "./Boisson";
import { Menu } from "./Menu";
import { Entree } from "./Entree";

export class Panier {
    mailUser : String;
    plats : Plat[];
    desserts : Dessert[];
    snacks : Snack[];
    boissons: Boisson[];
    entrees : Entree[];
    totalCost : Number;

    constructor(mailUser : String, dates: Date[], menus: Menu[],entrees?: Entree[], plats?: Plat[], desserts?: Dessert[], snacks? : Snack[], boissons?: Boisson[]){
        this.plats = plats;
        this.desserts = desserts;
        this.entrees = entrees;
        this.snacks = snacks;
        this.boissons = boissons;
        this.mailUser = mailUser;
        this.totalCost = this.calculateTotalCost();
    }

    calculateTotalCost(){
        //Utiliser menus[0->i].totalCost pour calculer les menus et nourriture[0->i].price pour le reste
        return 0;
    }
}