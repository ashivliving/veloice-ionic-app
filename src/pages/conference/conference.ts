import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public navParams: NavParams,public http: Http,public storage:Storage, private loadingCtrl: LoadingController ) {
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
		    //console.log("this.dialInData",this.dialInData)
     });
  	
  }


  dialOut(){
  	this.http.get('http://app.veloice.com:3000/api/Conferences?access_token='+this.id+'&filter={"where":{"conferenceType":"dial_out"}}') 
		 .map(res => res.json())
		  .subscribe(data => {
		  	this.dialOutData = data;
		  	
		    //console.log("this.dialOutData",this.dialOutData)
     });

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  conferenceAdd(dial) {
    if(dial) {
      console.log('Dial Out');
      this.confAdd(1);
    }
    else {
      console.log('Dial In');
      this.confAdd(0);
    }
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

  public confAdd(dial) {
    let prompt = this.alertCtrl.create({
      title: 'Add Conference',
      message: "Enter credentials",
      inputs: [
        {
          name: 'conferenceName',
          type: 'text',
          placeholder: 'Conference Name'
        },
        {
          name: 'pins',
          type: 'text',
          placeholder: 'Pins'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          class: 'primary',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if((data.conferenceName != "")&&(data.pins != "")){
              this.showLoading()
              let headers = new Headers({
                  'Content-Type': 'application/json'
                  });
                  let options = new RequestOptions({
                    headers: headers
                  });
                  let body = JSON.stringify({
                    conferenceName: data.conferenceName,
                    pins: data.pins,
                    access_token: this.id
                  });
              if(dial) {
                console.log("Adding dial out!");
                 return new Promise(resolve => {
                  this.http.post("http://app.veloice.com:3000/api/Conference/Conference_createDOConferrence", body, options)
                    .map(res => res.json())
                    .subscribe(user => {
                      console.log("Added dial out",user);
                      this.loading.dismiss();
                       },  error => {
                      this.showError("Cannot Add Conference!");
                    });
                 });

              }
              else {
                 console.log("Adding dial in!");
                 return new Promise(resolve => {
                  this.http.post("http://app.veloice.com:3000/api/Conference/Conference_createDIConferrence", body, options)
                    .map(res => res.json())
                    .subscribe(user => {
                      console.log("Added dial in",user);
                      this.loading.dismiss();
                       },  error => {
                      this.showError("Cannot Add Conference!");
                    });
                 });

              }
            }
          }
        }
      ]
    });
    prompt.present();

  }

}
