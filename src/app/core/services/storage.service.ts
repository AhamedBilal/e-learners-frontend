import { Injectable } from '@angular/core';
// import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  secretKey = "eLearningPlatformForME";

  constructor() { }

  encrypt(value : string) : any{
    // return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    // return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  setItem(key: string, value: any) {
    const val = JSON.stringify(value);
    localStorage.setItem(key, val);
  }


  getItem(key: string) {
    const strItem = localStorage.getItem(key);
    if (strItem !== 'undefined') {
      // @ts-ignore
      return JSON.parse(strItem);
    } else {
      return null;
    }
  }

}
