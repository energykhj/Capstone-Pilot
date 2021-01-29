import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://localhost:52938/api';
  readonly PhotoUrl = 'http://localhost:52938/photos/';

  constructor(private http:HttpClient) { }

  Login(val:any){
    return this.http.post(this.APIUrl+'/Authentication/Login',val)
  }

  CreateUser(val:any){
    return this.http.post(this.APIUrl+'/Authentication/CreateUser',val)
  }

  Register(val:any){
    return this.http.post(this.APIUrl+'/Authentication/Register',val)
  }

  GetUser(val:any){
    return this.http.get<any>(this.APIUrl+'/User'+val);
  }

  GetWeather():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/weatherforecast');
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
