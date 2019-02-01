import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'add-nourriture', loadChildren: './add-nourriture/add-nourriture.module#AddNourriturePageModule' },
  { path: 'carte-nourriture', loadChildren: './carte-nourriture/carte-nourriture.module#CarteNourriturePageModule' },
  { path: 'historique-commande', loadChildren: './historique-commande/historique-commande.module#HistoriqueCommandePageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'panier', loadChildren: './panier/panier.module#PanierPageModule' },
  { path: 'edit-nourriture', loadChildren: './edit-nourriture/edit-nourriture.module#EditNourriturePageModule' },
  { path: 'detail-nourriture', loadChildren: './detail-nourriture/detail-nourriture.module#DetailNourriturePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
