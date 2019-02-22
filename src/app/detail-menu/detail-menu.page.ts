import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Menu} from '../../models/Menu';
import {InventoryServiceService} from '../inventory-service.service';
import {Entree} from '../../models/Entree';
import {Plat} from '../../models/Plat';
import {Dessert} from '../../models/Dessert';
import {Boisson} from '../../models/Boisson';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-detail-menu',
  templateUrl: './detail-menu.page.html',
  styleUrls: ['./detail-menu.page.scss'],
})
export class DetailMenuPage implements OnInit {
  key: string;
  entreeKey: string;
  platKey: string;
  dessertKey: string;
  boissonKey: string;
  menu: Menu;
  entree: Entree;
  plat: Plat;
  dessert: Dessert;
  boisson: Boisson;
  constructor(private panier : PanierService, private route: ActivatedRoute, private Inventory: InventoryServiceService) { }

  ngOnInit() {
      this.key = this.route.snapshot.paramMap.get('key');
      this.entreeKey = this.route.snapshot.paramMap.get('entree');
      this.platKey = this.route.snapshot.paramMap.get('plat');
      this.dessertKey = this.route.snapshot.paramMap.get('dessert');
      this.boissonKey = this.route.snapshot.paramMap.get('boisson');
      this.getOneMenuFromDb(this.key);
      this.getItemsInMenu();
  }
  getOneMenuFromDb(key) {
      this.Inventory.getOneMenuFromDb(key).then((data: Menu) => this.menu = data);
  }
  getItemsInMenu() {
      if (this.entreeKey) {
          this.Inventory.getOneNourritureFromDb('Entrees', this.entreeKey).then((data: Entree) => this.entree = data);
      }
      if (this.platKey) {
          this.Inventory.getOneNourritureFromDb('Plats', this.platKey).then((data: Plat) => this.plat = data);
      }
      if (this.dessertKey) {
          this.Inventory.getOneNourritureFromDb('Desserts', this.dessertKey).then((data: Dessert) => this.dessert = data);
      }
      if (this.boissonKey) {
          this.Inventory.getOneNourritureFromDb('Boissons', this.boissonKey).then((data: Boisson) => this.boisson = data);
      }
  }
  addMenuToPanier(){
    this.panier.addMenuToPanier(this.menu);
  }
}
