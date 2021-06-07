import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File, filename: string) {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', filename);
    return this.http.post(environment.fileURI, formData).toPromise();
  }
}
