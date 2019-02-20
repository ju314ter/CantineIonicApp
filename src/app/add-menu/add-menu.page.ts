import { Component, OnInit } from "@angular/core";
import { Snack } from "../../models/Snack";
import { Boisson } from "../../models/Boisson";
import { Entree } from "../../models/Entree";
import { Plat } from "../../models/Plat";
import { Dessert } from "../../models/Dessert";
import { InventoryServiceService } from "../inventory-service.service";
import { Menu } from "../../models/Menu";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-menu",
  templateUrl: "./add-menu.page.html",
  styleUrls: ["./add-menu.page.scss"]
})
export class AddMenuPage implements OnInit {
  constructor(
    private Inventory: InventoryServiceService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}
  plats: Plat[];
  boissons: Boisson[];
  entrees: Entree[];
  desserts: Dessert[];
  menu = new Menu("", [new Date(), new Date()], "", "", "", "", "");
  ngOnInit() {
    this.getNourritureArray();
  }
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  getNourritureArray() {
    this.Inventory.getNourritureFromDb("Boissons").then((data: Boisson[]) => {
      this.boissons = data;
    });
    this.Inventory.getNourritureFromDb("Plats").then((data: Plat[]) => {
      this.plats = data;
    });
    this.Inventory.getNourritureFromDb("Entrees").then((data: Entree[]) => {
      this.entrees = data;
    });
    this.Inventory.getNourritureFromDb("Desserts").then((data: Dessert[]) => {
      this.desserts = data;
    });
  }
  addMenu(form) {
    this.menu.name = form.value.name;
    this.menu.entree = form.value.entree;
    this.menu.plat = form.value.plat;
    this.menu.dessert = form.value.dessert;
    this.menu.boisson = form.value.boisson;
    this.menu.date = this.getDates(
      new Date(form.value.date1),
      new Date(form.value.date2)
    );

    let menuPrice: number = 0;

    this.plats.forEach(nourriture => {
      if (nourriture.id == form.value.plat) {
        menuPrice += nourriture.price;
      }
    });
    this.entrees.forEach(nourriture => {
      if (nourriture.id == form.value.entree) {
        menuPrice += nourriture.price;
      }
    });
    this.boissons.forEach(nourriture => {
      if (nourriture.id == form.value.boisson) {
        menuPrice += nourriture.price;
      }
    });
    this.desserts.forEach(nourriture => {
      if (nourriture.id == form.value.dessert) {
        menuPrice += nourriture.price;
      }
    });

    this.menu.price = menuPrice;
    console.log(menuPrice);

    this.Inventory.pushMenuToDb<Menu>(this.menu)
      .then(() => {
        this.presentToast("Menu ajouté !");
        this.router.navigateByUrl("/home");
      })
      .catch(err => {
        console.log(err);
      });
  }
  getDates(startDate, endDate) {
    let dates = [],
    currentDate = startDate,
    addDays = function(days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    
    return dates;
  }
}
