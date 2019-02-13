import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryServiceService } from '../inventory-service.service';

import { Plat } from 'src/models/Plat';
import { Boisson } from 'src/models/Boisson';
import { Entree } from 'src/models/Entree';
import { Dessert } from 'src/models/Dessert';
import { Snack } from 'src/models/Snack';


import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-carte-nourriture',
  templateUrl: './carte-nourriture.page.html',
  styleUrls: ['./carte-nourriture.page.scss'],
})
export class CarteNourriturePage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  slideOpts = {
    effect: 'flip'
  };

  plats: Plat[];
  boissons: Boisson[];
  entrees: Entree[];
  desserts: Dessert[];
  snacks: Snack[];

  selectedNourriture: string = "p";
  isUserAdmin: boolean = false;
  user : Object = {};
  constructor(private Inventory: InventoryServiceService) { }

  ngOnInit() {
    this.getNourritureArray();
    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(user)
    // if(user.isAdmin){
    //   console.log("it's true ! :D")
    // }
  }

  changeDisplay($event){
    this.slides.getActiveIndex().then((index)=>{
      switch(index){
        case 0 : {
          this.selectedNourriture = "p";
          break;
        }
        case 1 : {
          this.selectedNourriture = "e";
          break;
        }
        case 2 : {
          this.selectedNourriture = "d";
          break;
        }
        case 3 : {
          this.selectedNourriture = "s";
          break;
        }
        case 4 : {
          this.selectedNourriture = "b";
          break;
        }
      }
    });
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
