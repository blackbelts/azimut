import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {
  public loading
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
  }
  showAlert(mesg, title) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: mesg,
      buttons: ['OK']
    });
    alert.present();
  }
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: 'Loading',
      showBackdrop: true,
    });
    this.loading.present();
  }
  showToast(mesg, duration, position) {
    const toast = this.toastCtrl.create({
      message: mesg,
      duration: duration,
      position: position
    });
    toast.present();
  }
  srcFromBase64Images(image) {
    return "data:image/png;base64," + image
  }
  returnValueOfRelation(arr = []) {
    return arr[1];
  }
}
