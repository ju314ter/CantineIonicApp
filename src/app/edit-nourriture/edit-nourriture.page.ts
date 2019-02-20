import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dessert} from '../../models/Dessert';
import {Plat} from '../../models/Plat';
import {Entree} from '../../models/Entree';
import {Boisson} from '../../models/Boisson';
import {InventoryServiceService} from '../inventory-service.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-edit-nourriture',
  templateUrl: './edit-nourriture.page.html',
  styleUrls: ['./edit-nourriture.page.scss'],
})
export class EditNourriturePage implements OnInit {
  key: string;
  type: string;
  nourriture: Object;
  constructor(private toastCtrl: ToastController, private route: ActivatedRoute, private Inventory: InventoryServiceService, private router: Router) { }

  ngOnInit() {
      this.key = this.route.snapshot.paramMap.get('key');
      this.type = this.route.snapshot.paramMap.get('type');
      this.getItemsInMenu(this.key, this.type);
  }
    async presentToast(message) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }
    getItemsInMenu(key, type) {
      type = type + 's';
      this.Inventory.getOneNourritureFromDb(type, key).then((data: Entree) => this.nourriture = data);

    }
    updateNourriture(form) {
      switch (this.type) {
          case 'Entree': {
              break;
          }
          case 'Plat': {
              break;
          }
          case 'Dessert': {
              break;
          }
      }
      let type = this.type + 's';
      form.value.ingredients = form.value.ingredients.split(/\n/);
      this.Inventory.updateNourritureToDb(this.key, type, form.value)
          .then(() => {
                  this.presentToast('Nourriture modifée !');
                  this.router.navigateByUrl('/home');
              }
          );
    }
}
