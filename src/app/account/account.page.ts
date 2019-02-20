import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/supermodels/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private userService : UserService) { }

  user : User = JSON.parse(localStorage.getItem('user'));

  ngOnInit() {
    console.log(this.user)
  }

  updateUser(updateUserForm){
    console.log(updateUserForm.value)
    this.user.pseudo = updateUserForm.value.pseudoInput
    this.user.promotion = updateUserForm.value.promotionInput
    this.userService.updateUserWithCredential(this.user)
    localStorage.setItem('user', JSON.stringify(this.user));
  }

}
