export class Nourriture {
  name: String;
  price: Number;
  isAvailableOffMenu: Boolean;
  availableQuantity: Number;
  imgUrl: String;
  type: String;

  constructor(name, price, isAvailableOffMenu, availableQuanity, imgUrl, type) {
    this.name = name;
    this.price = price;
    this.isAvailableOffMenu = isAvailableOffMenu;
    this.availableQuantity = availableQuanity;
    this.imgUrl = imgUrl;
    this.type = type;
  }

}

