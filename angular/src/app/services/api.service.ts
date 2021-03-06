import { Injectable, Input, OnInit } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import { map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs";

// headers = new Headers();
// options: any;



@Injectable()
export class apiService {

  private apiURL: string = "http://localhost:5939/api/";
  private token: string = "y9QoBe1bTC";

  constructor(private http: Http) {
    // this.options = new RequestOptions({ headers: this.headers });
  }

  private extractData(res: any) {
    console.log(res);
    if (res._body != "") {
      let body = res.json();
      return body;
    } else{
      if (res.status == 200){
        return {status: 200, message: "success"};
      } else {
        return {status: res.status, message: "error"};
      }
    }

  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }

  public getDeterminants(): Observable<any[]> {
    let request = this.apiURL + 'get/determinants/' + this.token;
    return this.http.get(request).map(this.extractData);
  }

  public getPreceptors(): Observable<any[]> {
    let request = this.apiURL + 'get/preceptors/' + this.token;
    return this.http.get(request).map(this.extractData);
  }

  public getQuestions(): Observable<any[]> {
    let request = this.apiURL + 'get/questions/';
    return this.http.get(request).map(this.extractData);
  }

  public getUsers(): Observable<any[]> {
    let request = this.apiURL + 'get/users/' + this.token;
    return this.http.get(request).map(this.extractData);
  }

  public getUserData(id): Observable<any[]> {
    let request = this.apiURL + 'get/user/' + id + '/' + this.token;
    return this.http.get(request).map(this.extractData);
  }
  public getTics(): Observable<any[]> {
    let request = this.apiURL + 'get/tics/' + this.token;
    return this.http.get(request).map(this.extractData);
  }

  private pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  public createQA(data, questions): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    data.questions = questions;
    data.date = data.date.year + "-" + this.pad(data.date.month, 2) + "-" + this.pad(data.date.day,2);
    delete data.noPreceptor;
    console.log(data);
    return this.http.post(this.apiURL + '/new/qa', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public createUser(data): Observable<any[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    delete data.pass_conf;
    data.active = 1;
    data.neverLoggedIn = 1;
    console.log(data);
    return this.http.post(this.apiURL + '/new/user', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
