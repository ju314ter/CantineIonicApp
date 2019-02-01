import { Component, OnInit } from '@angular/core';
import { InventoryServiceService } from '../inventory-service.service';

import { Plat } from 'src/models/Plat';
import { Boisson } from 'src/models/Boisson';
import { Entree } from 'src/models/Entree';
import { Dessert } from 'src/models/Dessert';
import { Snack } from 'src/models/Snack';

@Component({
  selector: 'app-carte-nourriture',
  templateUrl: './carte-nourriture.page.html',
  styleUrls: ['./carte-nourriture.page.scss'],
})
export class CarteNourriturePage implements OnInit {

  plats : Plat[];
  boissons: Boisson[];
  entrees: Entree[];
  desserts : Dessert[];
  snacks: Snack[];

  constructor(private Inventory: InventoryServiceService) { }

  ngOnInit() {
    this.getNourritureArray();
  }

  getNourritureArray(){
    this.Inventory.getNourritureFromDb("Boissons").then((data: Boisson[])=>{this.boissons = data;});
    this.Inventory.getNourritureFromDb("Plats").then((data: Plat[])=>{this.plats = data;});
    this.Inventory.getNourritureFromDb("Entrees").then((data : Entree[])=>{this.entrees = data;});
    this.Inventory.getNourritureFromDb("Desserts").then((data : Dessert[])=>{this.desserts = data;});
    this.Inventory.getNourritureFromDb("Snacks").then((data : Snack[])=>{this.snacks = data;});
  }

  deleteNourriture(id, type){
    console.log(id);
    console.log(type);
  }

}
