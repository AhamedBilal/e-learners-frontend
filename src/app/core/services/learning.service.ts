import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  constructor(private http: HttpClient) {
  }

  getCourses(getType: string) {
    getType = getType.toUpperCase();
    return this.http.get(environment.baseURI + 'learning', {params: {type: getType}});
  }

  getCoursesById(courseId: string) {
    return this.http.get(environment.baseURI + `learning/${courseId}`);
  }

  mark(data: any): Observable<any> {
    return this.http.post(environment.baseURI + 'learning/mark', data);
  }
}
