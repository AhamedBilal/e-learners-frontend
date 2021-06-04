import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isMenu = false;
  userData: any;
  token: any;

  constructor(private auth: AuthService, private userService: UserService, private data: DataService) {
  }

  ngOnInit(): void {
    this.token = this.auth.getToken();
    this.data.currentUserData.subscribe(res => {
      if (this.token) {
        if (res) {
          this.userData = res;
        } else {
          this.getLoggedUserData();
        }
      }
    })
  }

  getLoggedUserData() {
    this.userService.getCurrentUserDetail().subscribe(value => {
      this.userData = value;
      this.data.changeUserData(value);
    });
  }

  logout() {
    this.auth.logout();
  }
}
