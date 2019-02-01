import { Nourriture } from "./supermodels/Nourriture";

export class Entree extends Nourriture {
  description: String;
  ingredients: String[];
  temp: Boolean;
  constructor(
    ingredients: string[],
    name: string,
    price: number,
    isAvailableOffMenu: boolean,
    availableQuanity: number,
    imgUrl: string,
    description: string,
    temp: boolean,
    type : String,
  ) {
    super(name, price, isAvailableOffMenu, availableQuanity, imgUrl, type);

    this.ingredients = ingredients;
    this.description = description;
    this.temp = temp;
  }
}
