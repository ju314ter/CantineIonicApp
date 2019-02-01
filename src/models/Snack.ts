import { Nourriture } from "./supermodels/Nourriture";

export class Snack extends Nourriture {
  type: String;
  isSalty: Boolean;
  constructor(
    name: string,
    price: number,
    isAvailableOffMenu: boolean,
    availableQuanity: number,
    imgUrl: string,
    type: string,
    isSalty: boolean
  ) {
    super(name, price, isAvailableOffMenu, availableQuanity, imgUrl, type);
    this.isSalty = isSalty;
  }
}
