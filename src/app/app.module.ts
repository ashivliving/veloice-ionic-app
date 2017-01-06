import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthService } from '../providers/auth-service';
import { ConferencePage } from '../pages/conference/conference';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CallRecordingPage } from '../pages/call-recording/call-recording';
import { LoginPage } from '../pages/login/login';


@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    CallRecordingPage,
    ConferencePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    CallRecordingPage,
    ConferencePage,
    LoginPage
  ],
  providers: [AuthService,Storage]
})
export class AppModule {

  

}
