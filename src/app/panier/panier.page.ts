import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';
import { Nourriture } from 'src/models/supermodels/Nourriture';
import { Menu } from 'src/models/Menu';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  nourriturePanier: Nourriture[] = [];
  menuPanier: Menu[] = [];
  isNourriturePanierEmpty: Boolean = false;
  isMenuPanierEmpty: Boolean = false;

  constructor(private panierService: PanierService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.panierService.nourritureStore.subscribe((data) => {
      if(data.length === 0) {
        this.isNourriturePanierEmpty = true;
      } else {
        this.nourriturePanier = data;
        console.log(data)
        this.isNourriturePanierEmpty = false;
      }
    });
    this.panierService.menuStore.subscribe((data) => {
      if(data.length === 0) {
        this.isMenuPanierEmpty = true;
      } else {
      this.menuPanier = data
      console.log(data)

      this.isMenuPanierEmpty = false;
      }
    })
  }

  consumePanier(){
    let commandeSucess : boolean;
    this.panierService.consumePanier()
    this.commandeEnvoyee();
  }
  async commandeEnvoyee() {
    const alert = await this.alertCtrl.create({
        header: 'Commande envoyée !',
        message: 'Votre commande a été approuvée et enregistrée',
        buttons: [
            {
                text: 'Valider',
                role: 'cancel',
                cssClass: 'primary',
                handler: () => {
                  this.ngOnInit();
                }
            }
        ]
    });

    await alert.present();
}
}
