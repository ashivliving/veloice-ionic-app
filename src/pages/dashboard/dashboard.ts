import { Component } from '@angular/core';


import 'rxjs/add/operator/map';

import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
const dashboardUrl = 'http://app.veloice.com:3000/api/Dashboards/dashboardAnalytics';

//>>>>>>> Stashed changes
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
//<<<<<<< Updated upstream
public id:any;
public dashBoard:any;
  
 
 getDashboardDetails(){
 	console.log("this.id",this.id)
 	this.http.get('http://app.veloice.com:3000/api/Dashboards/dashboardAnalytics?access_token='+this.id+'') 
		 .map(res => res.json())
		  .subscribe(data => {
		  	this.dashBoard = data.res;
		    console.log("this.dashBoard",this.dashBoard)
     });

 }

	
	loading: Loading;
	//public homeDetail;
	public missedCallCount = 0;
	public agentCount = 0;
	public activeCallCount = 0;
	public voicemailCount = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage : Storage,private alertCtrl: AlertController, private http: Http, private loadingCtrl: LoadingController) {
  	this.showLoading();
     
  	  this.storage.get("id").then(status =>{
        this.id = status;
      });

      setTimeout(() => {
        this.http.get(dashboardUrl+'?access_token='+this.id)
         .map(res => res.json())
         .subscribe(data => {
            this.missedCallCount = data.res.missedCallCount;
            this.agentCount = data.res.agentCount;
            this.activeCallCount = data.res.activeCallCount;
            this.voicemailCount = data.res.voicemailCount;
            this.loading.dismiss();
          },error => {
            this.showError("Internal Server Error!");
          });
        },100);

  }

  public showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  public checkNotification() {
  	console.log("Bell Clicked!");
  }



//>>>>>>> Stashed changes

}
