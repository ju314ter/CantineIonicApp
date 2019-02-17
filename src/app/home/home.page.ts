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
  constructor(private Inventory: InventoryServiceService) { }

  ngOnInit() {
    this.getMenuArray();
  }
  getMenuArray() {
      this.Inventory.getMenuFromDb().then((data: Menu[]) => {
          data.forEach((menu)=>{
          this.Inventory.getOneNourritureFromDb("Plats", menu.plat)
          .then((plat)=>{
            menu.imgUrl = plat.imgUrl;
            this.menus = data;
          })
         })
      })
  }
}
