import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<any> {
    return this.http.get(environment.baseURI + 'category');
  }

  getAllLevels(): Observable<any> {
    return this.http.get(environment.baseURI + 'level');
  }

  getAllCourses() {
    return this.http.get(environment.baseURI + 'courses');
  }

  getTopCourses() {
    return this.http.get(environment.baseURI + 'courses/top');
  }

  getAllCoursesForInstructor(): Observable<any> {
    return this.http.get(environment.baseURI + 'courses/instructor');
  }

  addCourse(data: any): Observable<any> {
    return this.http.post(environment.baseURI + 'courses', data);
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get(environment.baseURI + `courses/${id}`);
  }

  getCourseByIdGeneral(id: number): Observable<any> {
    return this.http.get(environment.baseURI + `courses/general/${id}`);
  }

  getCourseByCategoryName(name: string): Observable<any> {
    return this.http.get(environment.baseURI + `courses/category/${name}`);
  }

  searchCourse(title: string): Observable<any> {
    return this.http.get(environment.baseURI + `courses/search/`, {params: {k: title}});
  }

  updateCourse(data: any): Observable<any> {
    return this.http.put(environment.baseURI + 'courses', data);
  }

  publishCourse(id: number): Observable<any> {
    return this.http.put(environment.baseURI + 'courses/publish', {id});
  }

  unpublishCourse(id: number): Observable<any> {
    return this.http.put(environment.baseURI + 'courses/unpublish', {id});
  }

  checkValidity(courseId: number) {
    return this.http.get(environment.baseURI + `courses/detail/${courseId}`);
  }

  addSection(data: any): Observable<any> {
    return this.http.post(environment.baseURI + 'section', data);
  }

  updateSection(data: any): Observable<any> {
    return this.http.put(environment.baseURI + 'section', data);
  }

  deleteSection(id: number): Observable<any> {
    return this.http.delete(environment.baseURI + `section/${id}`);
  }

  addLesson(data: any): Observable<any> {
    return this.http.post(environment.baseURI + 'lesson', data);
  }

  updateLesson(data: any): Observable<any> {
    return this.http.put(environment.baseURI + 'lesson', data);
  }

  deleteLesson(id: number): Observable<any> {
    return this.http.delete(environment.baseURI + `lesson/${id}`);
  }

  addToCart(id: number): Observable<any> {
    return this.http.post(environment.baseURI + 'cart', {id});
  }

  getCart(): Observable<any> {
    return this.http.get(environment.baseURI + 'cart');
  }

  removeItemFromCart(id: number): Observable<any> {
    return this.http.delete(environment.baseURI + `cart/${id}`);
  }

  addOrder(id: number) {
    return this.http.post(environment.baseURI + 'order', {id});
  }

}
