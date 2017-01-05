import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
const HAS_LOGGED_IN = 'hasLoggedIn';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	loading: Loading;
  user : any;
  registerCredentials = {email: '', password: ''};

	constructor(public storage: Storage,private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

/*	 public createAccount() {
    this.nav.push(RegisterPage);
  }

*/

public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials)
      .then(data => {
        this.user = data;
        this.storage.set(HAS_LOGGED_IN,true);
         this.storage.set('user', this.user);
          this.storage.set('id', this.user.id);
          this.nav.setRoot(DashboardPage);
         });
      this.loading.dismiss();
    }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
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
