import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
export class User {
  nom: string;
  email: string;
  password: string;
 
  constructor(nom: string, email: string, password: string) {
    this.nom = nom;
    this.email = email;
    this.password = password;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "password" && credentials.email === "email");
        this.currentUser = new User('Nguyen','thanh@hotmail.com', '123');
        observer.next(access);
        observer.complete();
      });  
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null|| credentials.nom === null ) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}