import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isMenu = false;
  userData: any;
  token: any;
  cartArr: any = [];
  categories: any[] = [];

  constructor(private auth: AuthService, private userService: UserService, private data: DataService, private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.data.currentUserData.subscribe(res => {
      this.token = this.auth.getToken();
      if (this.token) {
        if (res) {
          this.userData = res;
        } else {
          this.getLoggedUserData();
        }
      }
    });
    this.data.currentCartData.subscribe(value => {
      this.cartArr = value;
      console.log('cart', this.cartArr);
    });
    this.getAllCategories();
  }

  getLoggedUserData() {
    this.userService.getCurrentUserDetail().subscribe(value => {
      this.userData = value;
      this.data.changeUserData(value);
    });

    this.courseService.getCart().subscribe(value => {

     // @ts-ignore
      let cartAr = value?.courses?.map(item => item.id);
      this.data.changeCartData(cartAr);
    })
  }

  getAllCategories() {
    this.courseService.getAllCategories().subscribe(value => {
      console.log(value);
      this.categories = value;
    })
  }

  logout() {
    this.auth.logout();
  }
}
