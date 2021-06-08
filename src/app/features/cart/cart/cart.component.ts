import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../core/services/course.service";
import {DataService} from "../../../core/services/data.service";
import {AuthService} from "../../../core/services/auth.service";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  token: any;
  cart: any;
  fileURI = environment.fileURI;
  total: number = 0;
  cartArr: number[] = [];

  constructor(private courseService: CourseService, private data: DataService, private auth: AuthService) {
    this.token = this.auth.getToken();
  }

  ngOnInit(): void {
    this.getCart();
    this.data.currentCartData.subscribe(value => {
      this.cartArr = value;
    })
  }

  getCart() {
    if (this.token) {
      this.courseService.getCart().subscribe(value => {
        this.cart = value;
        // @ts-ignore
        this.total = this.cart.courses.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);
      });
    }
  }

  removeItem(id: number) {
    this.courseService.removeItemFromCart(id).subscribe(value => {
      console.log('removed', value);
      this.cart = value;
      let index = this.cartArr.indexOf(id);
      this.cartArr.splice(index, 1);
      this.data.changeCartData(this.cartArr);
      // @ts-ignore
      this.total = this.cart.courses.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);
    });
  }

  checkout() {
    if (this.cart && this.cart.courses.length > 0) {
      this.courseService.addOrder(this.cart.id).subscribe(value => {
        console.log(value);
        this.cart = value;
        this.data.changeCartData([]);
      });
    }
  }

}
