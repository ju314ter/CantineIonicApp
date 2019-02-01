import {Nourriture} from "./supermodels/Nourriture";

export class Plat extends Nourriture {
    type : String;
    ingredients : String[];
    temp : Boolean;
    constructor(name:string,
        price:number,
        isAvailableOffMenu:boolean,
        availableQuanity:number,
        imgUrl : string,
        type: string,
        ingredients : string[],
        temp: boolean)
        {
        super(name, price, isAvailableOffMenu, availableQuanity, imgUrl, type);
        this.ingredients = ingredients;
        this.temp = temp;
    }

}