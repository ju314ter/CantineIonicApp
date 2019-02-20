import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryServiceService } from '../inventory-service.service';

import { Plat } from 'src/models/Plat';
import { Boisson } from 'src/models/Boisson';
import { Entree } from 'src/models/Entree';
import { Dessert } from 'src/models/Dessert';
import { Snack } from 'src/models/Snack';


import {AlertController, IonSlides, ToastController} from '@ionic/angular';
import { Nourriture } from 'src/models/supermodels/Nourriture';
import { PanierService } from '../panier.service';

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
  user: Object = {};
  constructor(private Inventory: InventoryServiceService,
              private alertController: AlertController,
              private panierService: PanierService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.getNourritureArray();
    this.user = JSON.parse(localStorage.getItem('user'));
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
  back(){
    this.slides.slidePrev();
  }
  next(){
    this.slides.slideNext();
  }

  getNourritureArray(){
    this.Inventory.getNourritureFromDb("Boissons").then((data: Boisson[])=>{this.boissons = data;});
    this.Inventory.getNourritureFromDb("Plats").then((data: Plat[])=>{this.plats = data;});
    this.Inventory.getNourritureFromDb("Entrees").then((data : Entree[])=>{this.entrees = data;});
    this.Inventory.getNourritureFromDb("Desserts").then((data : Dessert[])=>{this.desserts = data;});
    this.Inventory.getNourritureFromDb("Snacks").then((data : Snack[])=>{this.snacks = data;});
  }

  async deleteNourriture(key, type) {
      type = type + 's';
      const alert = await this.alertController.create({
          header: 'Etes vous sûr ?!',
          message: 'Voulez vous supprimer cela ?',
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
                      this.Inventory.deleteNourriture(key, type);
                      console.log('Confirm Okay');
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
  addToCart(nourriture: Nourriture){
    this.panierService.addPlatToPanier(nourriture).then(() => {
        this.presentToast('Nourriture ajoutée au panier !');
    }).catch(() => {
        this.presentToast('Service terminée !');
    });
  }
}
