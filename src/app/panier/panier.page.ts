import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';
import { Nourriture } from 'src/models/supermodels/Nourriture';
import { Menu } from 'src/models/Menu';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  nourriturePanier: Nourriture[] = []
  menuPanier: Menu[] = []
  isNourriturePanierEmpty: Boolean = false;
  isMenuPanierEmpty: Boolean = false;

  constructor(private panierService: PanierService) { }

  ngOnInit() {

    this.panierService.nourritureStore.subscribe((data)=>{
      if(data.length == 0){
        this.isNourriturePanierEmpty = true;
      } else {
        this.nourriturePanier = data;
      }
    })
    this.panierService.menuStore.subscribe((data)=>{
      if(data.length == 0){
        this.isMenuPanierEmpty = true;
      } else {
      this.menuPanier = data
      }
    })

  }

}
