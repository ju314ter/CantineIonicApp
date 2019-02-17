import { Component } from '@angular/core';

import {AlertController, NavController} from '@ionic/angular';
import { Menu } from 'src/models/Menu';
import { InventoryServiceService } from '../inventory-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menus: Menu[];
  imgMenuArray : string[] = [];
  menuToDisplay : Object = {};
  user : Object = {};
  constructor(private Inventory: InventoryServiceService, public alertController: AlertController) { }

  ngOnInit() {
    this.getMenuArray();
      this.user = JSON.parse(localStorage.getItem('user'));
  }
  getMenuArray() {
        this.Inventory.getMenuFromDb().then((data: Menu[]) => {
            data.forEach((menu)=>{
                this.Inventory.getOneNourritureFromDb("Plats", menu.plat)
                    .then((plat)=>{
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
}
