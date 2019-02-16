import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AuthGuardGuard } from './login/auth-guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuardGuard]},
  { path: 'add-nourriture', loadChildren: './add-nourriture/add-nourriture.module#AddNourriturePageModule', canActivate: [AuthGuardGuard] },
  { path: 'carte-nourriture', loadChildren: './carte-nourriture/carte-nourriture.module#CarteNourriturePageModule', canActivate: [AuthGuardGuard] },
  { path: 'historique-commande', loadChildren: './historique-commande/historique-commande.module#HistoriqueCommandePageModule', canActivate: [AuthGuardGuard] },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule', canActivate: [AuthGuardGuard] },
  { path: 'panier', loadChildren: './panier/panier.module#PanierPageModule', canActivate: [AuthGuardGuard] },
  { path: 'detail-nourriture', loadChildren: './detail-nourriture/detail-nourriture.module#DetailNourriturePageModule', canActivate: [AuthGuardGuard] },
  { path: 'edit-nourriture/:key/:type', loadChildren: './edit-nourriture/edit-nourriture.module#EditNourriturePageModule', canActivate: [AuthGuardGuard] },
  { path: 'detail-nourriture/:key/:type', loadChildren: './detail-nourriture/detail-nourriture.module#DetailNourriturePageModule', canActivate: [AuthGuardGuard] },
  { path: 'add-menu', loadChildren: './add-menu/add-menu.module#AddMenuPageModule', canActivate: [AuthGuardGuard] },
  { path: 'detail-menu/:key/:entree/:plat/:dessert/:boisson', loadChildren: './detail-menu/detail-menu.module#DetailMenuPageModule', canActivate: [AuthGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
