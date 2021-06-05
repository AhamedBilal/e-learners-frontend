import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUserDetail() {
    return this.http.get(environment.baseURI + 'user/loggedin')
  }

  updateProfile(data: any) {
    return this.http.put(environment.baseURI + 'user/profile', data);
  }

  changePassword(data: any) {
    return this.http.put(environment.baseURI + 'user/changePassword', data);
  }

  getUserById(id: number) {
    return this.http.get(environment.baseURI + `user/${id}`);
  }

  getAllUsers(id: number) {
    return this.http.get(environment.baseURI + `user`);
  }

  editPhoto(obj: FormData) {
    return this.http.put(environment.baseURI + `user/edit-photo`, obj);
  }

  becomeInstructor() {
    return this.http.put(environment.baseURI + `auth/become-instructor`, null);
  }

}
