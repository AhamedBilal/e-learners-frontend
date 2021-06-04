import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) {
  }

  signUp(data: any): Observable<any> {
    return this.http.post(environment.baseURI + 'auth/signup', data);
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.baseURI + 'auth/signin', data);
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

  getToken() {
    return this.storage.getItem('token') || null;
  }

  setToken(token: string) {
    this.storage.setItem('token', token);
  }
}
