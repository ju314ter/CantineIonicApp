import { Component, OnInit } from '@angular/core';
import {Plat} from '../../models/Plat';
import {Entree} from '../../models/Entree';
import {Dessert} from '../../models/Dessert';
import {InventoryServiceService} from '../inventory-service.service';
import {Boisson} from '../../models/Boisson';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-nourriture',
  templateUrl: './detail-nourriture.page.html',
  styleUrls: ['./detail-nourriture.page.scss'],
})
export class DetailNourriturePage implements OnInit {
  key: string;
  type: string;
  entree: Entree;
  plat: Plat;
  dessert: Dessert;
  constructor(private Inventory: InventoryServiceService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('key');
    this.type = this.route.snapshot.paramMap.get('type');
    this.getOneNourriture(this.key, this.type);
  }
    getOneNourriture(key, type) {
      switch (type) {
          case 'Entree':
            this.Inventory.getOneNourritureFromDb('Entrees', key).then((data: Entree) => this.entree = data);
            break;
          case 'Plat':
            this.Inventory.getOneNourritureFromDb('Plats', key).then((data: Plat) => this.plat = data);
            break;
          case 'Dessert':
            this.Inventory.getOneNourritureFromDb('Desserts', key).then((data: Dessert) => this.dessert = data);
            break;
          default:
            console.log('Pas de type sélectionné');
      }
    }
    //TODO: Faire fonction "ajouter au panier"
    /*addPanier() {}*/
}
