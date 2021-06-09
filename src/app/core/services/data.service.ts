import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userData = new BehaviorSubject(null);
  currentUserData = this.userData.asObservable();
  userDataObj: any;


  private cartData = new BehaviorSubject([]);
  currentCartData = this.cartData.asObservable();
  cartArr: any = [];

  private plyrReset = new BehaviorSubject(false);
  resetPlayerEvent = this.userData.asObservable();

  constructor() {
  }

  resetPlayer() {
    this.plyrReset.next(true);
  }

  changeUserData(obj: any) {
    if (this.userDataObj) {
      this.userDataObj = {...this.userDataObj, ...obj};
    } else {
      this.userDataObj = {...obj};
    }
    this.userData.next(this.userDataObj)
  }

  changeCartData(obj: any) {
    this.cartArr = obj;
    this.cartData.next(this.cartArr);
  }

  addCartData(obj: number) {
    this.cartArr.push(obj);
    this.cartData.next(this.cartArr);
  }
}
