import { Nourriture } from "./supermodels/Nourriture";

export class Boisson extends Nourriture {
  temp: Boolean;
  constructor(
    name: string,
    price: number,
    isAvailableOffMenu: boolean,
    availableQuanity: number,
    imgUrl: string,
    type: string,
    temp: boolean,
    id?: String
  ) {
    super(name, price, isAvailableOffMenu, availableQuanity, imgUrl, type, id);
    this.temp = temp;
  }
}
