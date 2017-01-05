import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar} from 'ionic-native';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';

// const HAS_LOGGED_IN = 'hasLoggedIn';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public storage:Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage }
    ];

  }

  Logout(){
    this.storage.remove("hasLoggedIn");
    this.storage.remove('user');
    this.storage.remove('id');
    this.nav.setRoot(LoginPage);
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get("hasLoggedIn").then(status=> {
        if(status==true){
          this.nav.setRoot(DashboardPage);
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.hide();
    });
  }

}
