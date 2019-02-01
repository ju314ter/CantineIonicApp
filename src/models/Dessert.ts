import { Nourriture } from "./supermodels/Nourriture";

export class Dessert extends Nourriture {
  isFrozen: Boolean;
  constructor(
    name: string,
    price: number,
    isAvailableOffMenu: boolean,
    availableQuanity: number,
    imgUrl: string,
    type: string,
    isFrozen: boolean
  ) {
    super(name, price, isAvailableOffMenu, availableQuanity, imgUrl, type);
    this.isFrozen = isFrozen;
  }
}
