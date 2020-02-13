import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from './../core/service/database.service';
import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  backButtonSubscription;

  showsplash = true;

  constructor(
    private platform: Platform,
    private router: ActivatedRoute,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: DatabaseService,
    private navCtrl: NavController
  ) {
    this.initializeApp();    
  }


 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showsplash = false);
      this.db.openDatabase();
    });
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if(window.location.pathname == "/home"){
        navigator['app'].exitApp();
      }else{
        this.navCtrl.navigateBack('/');
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscrible();
  }
}
