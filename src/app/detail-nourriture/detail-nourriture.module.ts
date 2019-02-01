import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailNourriturePage } from './detail-nourriture.page';

const routes: Routes = [
  {
    path: '',
    component: DetailNourriturePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailNourriturePage]
})
export class DetailNourriturePageModule {}
