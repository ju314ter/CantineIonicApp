import { Component, ViewChild } from "@angular/core";

import {AlertController, NavController, IonSlides, ToastController} from '@ionic/angular';
import { Menu } from "src/models/Menu";
import { InventoryServiceService } from "../inventory-service.service";
import { PanierService } from "../panier.service";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  @ViewChild(IonSlides) slides: IonSlides;
  slideOpts = {
    effect: "flip"
  };
  menus: Menu[];
  imgMenuArray: string[] = [];
  menuToDisplay: Object = {};
  user: Object = {};
  today = new Date();
  currentDate = this.formatDate(this.today);
  constructor(
    private Inventory: InventoryServiceService,
    public alertController: AlertController,
    private panierService: PanierService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.getMenuArray(this.currentDate);
    this.user = JSON.parse(localStorage.getItem("user"));
  }
  formatDate(date) {
      let YYYY = date.getFullYear();
      let MM = date.getMonth() + 1;
      let DD = date.getDate();
      if (MM < 10) {
          MM = '0' + MM;
      }
      if (DD < 10) {
          DD = '0' + DD;
      }
      return YYYY + '-' + MM + '-' + DD;
  }
  previousMenu() {
    this.slides.slidePrev();
  }
  nextMenu() {
    this.slides.slideNext();
  }
  changeDate() {
      console.log(this.currentDate);
    /*this.currentDate = new Date(this.currentDate);*/
    this.getMenuArray(this.currentDate);
  }
  /*getTodayDate() {
      let currentDate = this.formatDate(new Date());
      let currentISODate = currentDate.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
  }*/
  getMenuArray(currentDate) {
    this.menus = [];
    this.Inventory.getMenuFromDb(currentDate).then((data: Menu[]) => {
      data.forEach(menu => {
        this.Inventory.getOneNourritureFromDb("Plats", menu.plat).then(plat => {
          menu.imgUrl = plat.imgUrl;
          this.menus = data;
        });
      });
    });
  }
  async deleteMenu(key) {
    const alert = await this.alertController.create({
      header: "Etes vous sûr ?!",
      message: "Voulez vous supprimer ce <strong>menu</strong> ?",
      buttons: [
        {
          text: "Non",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Oui",
          handler: () => {
            this.Inventory.deleteMenu(key);
            console.log("Confirm Okay");
            this.ngOnInit();
          }
        }
      ]
    });

    await alert.present();
  }
    async presentToast(message) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }
  addMenuToPanier(menu: Menu, date) {
    this.panierService.addMenuToPanier(menu, date).then(() => {
        this.presentToast('Menu ajouté au panier !');
    }).catch(() => {
        this.presentToast('Impossible d\'ajouter au panier');
    });
  }
}
