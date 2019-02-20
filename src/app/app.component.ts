import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public userConnected : Boolean;
  
  public appPages = [
    {
      title: 'Menus',
      url: '/home',
      icon: 'grid'
    },
    {
      title: 'La carte',
      url: '/carte-nourriture',
      icon: 'pizza'
    },
    {
      title: 'Historique',
      url: '/historique-commande',
      icon: 'bookmarks'
    },
    {
      title: 'Panier',
      url: '/panier-page',
      icon: 'basket'
    },
    {
      title: 'Compte',
      url: '/account',
      icon: 'contact'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private router: Router,
  ) {
    
    this.initializeApp();
    
    (localStorage.getItem('user'))? this.userConnected = true : this.userConnected = false;
  }

  logout(){
      localStorage.clear();
      this.userService.logOutUser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
