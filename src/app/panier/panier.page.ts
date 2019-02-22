import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';
import { Nourriture } from 'src/models/supermodels/Nourriture';
import { Menu } from 'src/models/Menu';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  prixPanier: number;
  nourriturePanier: Observable<Nourriture[]>
  menuPanier: Observable<Menu[]>
  isNourriturePanierEmpty: boolean;
  isMenuPanierEmpty: boolean;

  constructor(private panierService: PanierService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.isNourriturePanierEmpty = this.panierService.isNourriturePanierEmpty;
    this.isMenuPanierEmpty = this.panierService.isMenuPanierEmpty;
    this.nourriturePanier= this.panierService.getNourriturePanier()
    this.menuPanier= this.panierService.getMenuPanier()
    this.prixPanier = this.panierService.calculerPrixPanier();
  }

  deletePlatFromPanier(plat){
    this.panierService.deletePlatFromPanier(plat);
    this.prixPanier = this.panierService.calculerPrixPanier();
  }

  consumePanier(){
    this.panierService.consumePanier()
    .then(()=>{
      this.commandeEnvoyee();
    })
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
                  this.ionViewDidEnter();
                }
            }
        ]
    });
    await alert.present();
  }
}
