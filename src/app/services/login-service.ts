import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from '../model/response-model';
import { environment } from '../environment/environmentLocal';
import { loginModel } from '../model/login-model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  ctrlUrl = 'api/Auth/login';
    constructor(
    private _http: HttpClient,
  ) {}

  validateUserToken(payload : loginModel): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(`${environment.appUrl + this.ctrlUrl}`, payload);
  }
}
