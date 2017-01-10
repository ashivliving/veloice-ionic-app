import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native';

/*
  Generated class for the CallRecording page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
const CRecording = 'http://app.veloice.com:3000/api/CallRecordings/callHistoryList';
//?created_from=2016-12-30&created_to=2017-1-7&access_token=xsISasdUnMq7xrEIsEcNkB6FYFcaULtSW3tfHLGHY6RHyJfel4QBaSa7eqM95kUo';
@Component({
  selector: 'page-call-recording',
  templateUrl: 'call-recording.html'
})
export class CallRecordingPage {
  public noData:any;
	public detail;
	public id;
  public file;
  loading: Loading;
  public full_date = new Date();
  public year = this.full_date.getFullYear();
  public month = (this.full_date.getMonth()+1)<10?'0'+(this.full_date.getMonth()+1):(this.full_date.getMonth()+1);
  public date_t = (this.full_date.getDate())<10?'0'+(this.full_date.getDate()):(this.full_date.getDate());
  public date_f = (this.date_t)>15?15:'01';
  public date = {
    created_from: this.year + '-' + this.month + '-' + this.date_f,
    created_to: this.year + '-' + this.month + '-' + this.date_t
  }
    constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,public storage : Storage,private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
      this.showLoading();
      this.noData =false;
  	  this.storage.get("id").then(status =>{
        this.id = status;
      });

      setTimeout(() => {
        this.http.get(CRecording+'?access_token='+this.id+'&created_from='+this.date.created_from+'&created_to='+this.date.created_to)
         .map(res => res.json())
         .subscribe(data => {
            this.detail = data.res.data;
            this.loading.dismiss();
            if(this.detail.length==0){
              this.noData =true;
            }
          },error => {
            this.showError("Internal Server Error!");
          });
        },500);
      
  }

  

  public changeDate() {
    this.showLoading();
      this.noData =false;
      this.detail = [];
  		 this.http.get(CRecording+'?access_token='+this.id+'&created_from='+this.date.created_from+'&created_to='+this.date.created_to)
         .map(res => res.json())
         .subscribe(data => {
           if(data.res.status=="success"){
            this.detail = data.res.data;
            if(this.detail.length==0){
              this.noData =true;
            }
            this.loading.dismiss();
          }else{
            this.loading.dismiss();
            this.showError('Date out of Range!');
          }

          },error => {
            this.showError("Internal Server Error!")
          });
    
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

  public playAudio(url) {
    console.log("Url - ",url);
    this.file = new MediaPlugin(url);
    this.file.play();
    this.file.init.then(() => {
      console.log('Playback Finished');
    }, (err) => {
      console.log('somthing went wrong! error code: ' + err.code + ' message: ' + err.message);
    });

    

  }

}
