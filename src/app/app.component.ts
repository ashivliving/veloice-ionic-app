import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { AuthService } from '../providers/auth-service';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
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
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];

  }

  Logout(){
    this.storage.remove("hasLoggedIn");
    this.storage.remove('username');
    this.storage.remove('id');
    this.nav.setRoot(LoginPage);
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get("hasLoggedIn").then(status=> {
        if(status==true){
          this.nav.setRoot(Page1);
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.hide();
    });
  }

}
