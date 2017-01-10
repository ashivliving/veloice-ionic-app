import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'; 
/*
  Generated class for the Conference page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-conference',
  templateUrl: 'conference.html'
})
export class ConferencePage {
loading: Loading;
public dial;
public id:any;
public dialInData:any;
public dialOutData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public storage:Storage, private loadingCtrl: LoadingController ) {
	  this.dial = 'dialin';
  this.storage.get("id").then(status=> {
       this.id=status;
  	})
  	this.showLoading();
  	setTimeout(() => {
       this.dialIn();
       this.dialOut();
       this.loading.dismiss();
    },500);

  }

  dialIn(){
     this.http.get('http://app.veloice.com:3000/api/Conferences?access_token='+this.id+'&filter={"where":{"conferenceType":"dial_in"}}') 
		 .map(res => res.json())
		  .subscribe(data => {
		  	this.dialInData = data;
		    console.log("this.dialInData",this.dialInData)
     });
  	
  }


  dialOut(){
  	this.http.get('http://app.veloice.com:3000/api/Conferences?access_token='+this.id+'&filter={"where":{"conferenceType":"dial_out"}}') 
		 .map(res => res.json())
		  .subscribe(data => {
		  	this.dialOutData = data;
		  	
		    console.log("this.dialOutData",this.dialOutData)
     });

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

}
