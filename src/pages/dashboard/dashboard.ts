import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
public id:any;
public dashBoard:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public storage:Storage) {
  	this.storage.get("id").then(status=> {
       this.id=status;
  	})
  	setTimeout(() => {
       this.getDashboardDetails();
       
    },2000);
  }
 
 getDashboardDetails(){
 	console.log("this.id",this.id)
 	this.http.get('http://app.veloice.com:3000/api/Dashboards/dashboardAnalytics?access_token='+this.id+'') 
		 .map(res => res.json())
		  .subscribe(data => {
		  	this.dashBoard = data.res;
		    console.log("this.dashBoard",this.dashBoard)
     });

 }

}
