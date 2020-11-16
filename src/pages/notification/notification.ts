import { CommonProvider } from './../../providers/common/common';
import { OdooProvider } from './../../providers/odoo/odoo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications;
  myNewNotifications: any[] = [];
  notificationsIds = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private odooProv: OdooProvider,
    public common: CommonProvider,
    public app: MyApp
  ) {
    this.notificationsIds = this.common.notificationsIds
    this.common.getNotifications()
    /* this.myNewNotifications = this.common.notifications */
    console.log("notificationsIds", this.notificationsIds)
    this.odooProv.createOrwrite(
      {
        uid: this.odooProv.getUid(),
        password: this.odooProv.getPassword(),
        modalname: "smart.notification",
        method: "seen_notifications",
        parmlist: [
          this.odooProv.getUid(),
          this.notificationsIds
        ]
      })
      .map(res => res)
      .subscribe(res => {
        console.log("seeen", res)
      });


  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad NotificationPage');
  }
  ionViewWillLeave() {
     this.app.interval = Observable.interval(60000)
       .subscribe((val) => { this.common.getNotifications() });
  }
  // test(){
  //   this.odooProv.createOrwrite([[2],{}])
  // }

}
