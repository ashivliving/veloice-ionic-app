import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const LOGIN_URL = 'http://app.veloice.com:3000/api/ExtendedUsers/login';

export class User {
  name: string;
  email: string;
  
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  loading: Loading;
	currentUser: User;
  user: any;
  x:any;

	constructor(private http: Http,private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    }

    login(credentials) {
     return this.load(credentials);
    }

    load(credentials) {
  if (this.user) {
    // already loaded data
    return Promise.resolve(this.user);
  }
  let headers = new Headers({
      'Content-Type': 'application/json'
      });
      let options = new RequestOptions({
        headers: headers
      });
      let body = JSON.stringify({
        email: credentials.email,
        password: credentials.password
      });

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.post(LOGIN_URL, body, options)
      .map(res => res.json())
      .subscribe(user => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.user = user;
        let body = JSON.stringify({
          email: null,
          password: null
            });
        resolve(this.user);
         },  error => {
        this.showError("User Not Found");
      });
   });

  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
