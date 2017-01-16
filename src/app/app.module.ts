import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthService } from '../providers/auth-service';
import { ConferencePage } from '../pages/conference/conference';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CallRecordingPage } from '../pages/call-recording/call-recording';
import { LoginPage } from '../pages/login/login';
import { CallhistoryPage } from '../pages/callhistory/callhistory';


@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    CallRecordingPage,
    ConferencePage,
    LoginPage,
    CallhistoryPage
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
    LoginPage,
    CallhistoryPage
  ],
  providers: [AuthService,Storage]
})
export class AppModule {

  

}
