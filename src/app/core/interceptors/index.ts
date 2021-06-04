import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {StorageService} from "../services/storage.service";
import {AuthService} from "../services/auth.service";
import {SpinnerInterceptor} from "./spinner.interceptor";
import {ErrorInterceptor} from "./error.interceptor";


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
