import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";

import { Router } from "@angular/router";

import { InventoryServiceService } from "../inventory-service.service"

import { Plat } from "../../models/Plat";
import { Dessert } from "../../models/Dessert";
import { Snack } from "../../models/Snack";
import { Boisson } from "../../models/Boisson";
import { Entree } from "../../models/Entree";

@Component({
  selector: "app-add-nourriture",
  templateUrl: "./add-nourriture.page.html",
  styleUrls: ["./add-nourriture.page.scss"]
})
export class AddNourriturePage implements OnInit {
  plat = new Plat("", 0, false, 0, "", "", [""], false);
  dessert = new Dessert("", 0, false, 0, "", "", false);
  snack = new Snack("", 0, false, 0, "", "", false);
  boisson = new Boisson("", 0, false, 0, "", "", false);
  entree = new Entree([""], "", 0, false, 0, "", "", false, "");

  selectedNourriture : string;
  selectedForm : string;

  constructor(public toastCtrl: ToastController, private router: Router, private inventory: InventoryServiceService) {}

  ngOnInit() {
    this.selectedForm = "";
    this.selectedNourriture = "";
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  addPlat(newPlat) {
    this.plat.name = newPlat.value.name;
    this.plat.price = newPlat.value.price;
    this.plat.isAvailableOffMenu = newPlat.value.isAvailableOffMenu;
    this.plat.availableQuantity = newPlat.value.availableQuantity;
    this.plat.imgUrl = newPlat.value.imgUrl;
    this.plat.type = "Plat";
    this.plat.ingredients = newPlat.value.ingredients.split(/\n/);
    this.plat.temp = newPlat.value.temp;

    this.inventory.pushNourritureToDb<Plat>(this.plat).then(()=>{
      this.presentToast("Document ajouté !");
    }).catch((err)=>{console.log(err)});

    this.router.navigateByUrl('/home');
  }
  addEntree(newEntree) {
    this.entree.name = newEntree.value.name;
    this.entree.type = "Entree";
    this.entree.price = newEntree.value.price;
    this.entree.isAvailableOffMenu = newEntree.value.isAvailableOffMenu;
    this.entree.availableQuantity = newEntree.value.availableQuantity;
    this.entree.imgUrl = newEntree.value.imgUrl;
    this.entree.description = newEntree.value.description;
    this.entree.temp = newEntree.value.temp;
    this.entree.ingredients = newEntree.value.ingredients.split(/\n/);

    this.inventory.pushNourritureToDb<Entree>(this.entree);
    this.router.navigateByUrl('/home');
  }
  addDessert(newDessert) {
    this.dessert.name = newDessert.value.name;
    this.dessert.price = newDessert.value.price;
    this.dessert.isAvailableOffMenu = newDessert.value.isAvailableOffMenu;
    this.dessert.availableQuantity = newDessert.value.availableQuantity;
    this.dessert.imgUrl = newDessert.value.imgUrl;
    this.dessert.type = "Dessert";
    this.dessert.isFrozen = newDessert.value.isFrozen;

    this.inventory.pushNourritureToDb<Dessert>(this.dessert)
    this.router.navigateByUrl('/home');
  }
  addBoisson(newBoisson) {
    this.boisson.name = newBoisson.value.name;
    this.boisson.price = newBoisson.value.price;
    this.boisson.isAvailableOffMenu = newBoisson.value.isAvailableOffMenu;
    this.boisson.availableQuantity = newBoisson.value.availableQuantity;
    this.boisson.imgUrl = newBoisson.value.imgUrl;
    this.boisson.temp = newBoisson.value.temp;
    this.boisson.type = "Boisson";


    this.inventory.pushNourritureToDb<Boisson>(this.boisson)
    this.router.navigateByUrl('/home');
  }
  addSnack(newSnack) {
    this.snack.name = newSnack.value.name;
    this.snack.price = newSnack.value.price;
    this.snack.isAvailableOffMenu = newSnack.value.isAvailableOffMenu;
    this.snack.availableQuantity = newSnack.value.availableQuantity;
    this.snack.imgUrl = newSnack.value.imgUrl;
    this.snack.type = "Snack";
    this.snack.isSalty = newSnack.value.isSalty;

    this.inventory.pushNourritureToDb<Snack>(this.snack)
    this.router.navigateByUrl('/home');
  }
}
