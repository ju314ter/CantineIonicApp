import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  connexionVisible : boolean = true;
  status : String = "Inscription";

  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')){
      this.router.navigate(['/home'])
    }
  }

  toggleInscription(){
    
    (this.connexionVisible)? this.connexionVisible = false : this.connexionVisible = true;
    (this.status == "Inscription")? this.status = "Connexion" : this.status = "Inscription";
  }

}
