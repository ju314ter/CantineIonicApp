import { Component } from '@angular/core';

import {AlertController, NavController} from '@ionic/angular';
import { Menu } from 'src/models/Menu';
import { InventoryServiceService } from '../inventory-service.service';
import { PanierService } from '../panier.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menus: Menu[];
  imgMenuArray: string[] = [];
  menuToDisplay: Object = {};
  user: Object = {};
  today = new Date();
  currentDate = this.formatDate(this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate());
  constructor(private Inventory: InventoryServiceService,
              public alertController: AlertController,
              private panierService: PanierService) { }

  ngOnInit() {
    this.getMenuArray(this.currentDate);
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  changeDate() {
    this.currentDate = this.formatDate(new Date(this.currentDate));
    this.getMenuArray(this.currentDate);
    console.log(this.menus);
  }
  formatDate(date) {
      let isoDate = new Date(date).toISOString();
      return isoDate;
  }
  /*getTodayDate() {
      let currentDate = this.formatDate(new Date());
      let currentISODate = currentDate.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
  }*/
  getMenuArray(currenDate) {
      this.menus = [];
        this.Inventory.getMenuFromDb(currenDate).then((data: Menu[]) => {
            data.forEach((menu) => {
                this.Inventory.getOneNourritureFromDb('Plats', menu.plat)
                    .then((plat) => {
                        menu.imgUrl = plat.imgUrl;
                        this.menus = data;
                    });
            });
        });
  }
  async deleteMenu(key) {
      const alert = await this.alertController.create({
          header: 'Etes vous sûr ?!',
          message: 'Voulez vous supprimer ce <strong>menu</strong> ?',
          buttons: [
              {
                  text: 'Non',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                      console.log('Confirm Cancel: blah');
                  }
              }, {
                  text: 'Oui',
                  handler: () => {
                      this.Inventory.deleteMenu(key);
                      console.log('Confirm Okay');
                      this.ngOnInit();
                  }
              }
          ]
      });

      await alert.present();
  }
  addMenuToPanier(menu: Menu){
        this.panierService.addMenuToPanier(menu);
  }
}
