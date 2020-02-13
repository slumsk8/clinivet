import { CallNumber } from '@ionic-native/call-number/ngx';
import { Platform, NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  backButtonSubscription;
  whatsapp = 5571987322709;
  text = 'Teste';



  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private call: CallNumber
  ) {}

  ngOnInit() {
    
  }

  sendCall(){
    this.call.callNumber("35217054", true)
      .then(res => console.log('Chamando!', res))
      .catch(err => console.error('Erro ao chamar', err));
  }

  goWhastApp(){
    window.open('https://api.whatsapp.com/send?phone='+this.whatsapp);
  }

  goInstagram(){
    window.open('https://www.instagram.com/aragaotiago85');
  }
  // ngAfterViewInit() {
  //   this.backButtonSubscription = this.platform.backButton.subscribe(() => {
  //     if(window.location.pathname == "/home"){
  //       navigator['app'].exitApp();
  //     }else{
  //       this.navCtrl.navigateBack('/' + 'componetToGo');
  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   this.backButtonSubscription.unsubscrible();
  // }

}
