import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CommonProvider {

  private loader: any;
  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {
    //console.log('Hello CommonProvider Provider');
  }
  
  showAlert(message) {
    let alert = this.alertCtrl.create({ title: 'Information', subTitle: message, buttons: ['OK'] });
    alert.present();
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({ content: "Loading..." });
    this.loader.present();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({ message: msg, duration: 3000 });
    toast.present();
  }

  showError(obj) {
    console.log(obj);
    let errorMeg: any = '';
    if (obj.status == 404 && typeof (obj.name) == 'undefined') {
      errorMeg = 'Api request failed.';
    } else if (obj.name == 'TimeoutError' && typeof (obj.status) == 'undefined') {
      errorMeg = 'Connection timed out. Please try again.';
    } else {
      errorMeg = 'An error occured. Please try again.';
    }
    let toast = this.toastCtrl.create({ message: errorMeg, duration: 3000 });
    toast.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }
  getFomatedPrice(n) {
    n = n.toFixed(2);
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  

  srcFromBase64Images(image) {
    return "data:image/png;base64," + image
  }
}

