import { OdooProvider } from './../../providers/odoo/odoo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private odooProv: OdooProvider) {
    this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(), "smart.notification",
     "search_read", [],
      []).map(res => res)
       .subscribe(res => {
        console.log(res)
        this.notifications = res
        this.notifications.forEach(rec => {    
          rec.useer.forEach(id => {
            if (id == this.odooProv.getUid()){
                this.myNewNotifications.push(rec);
            }
          });
        })
        console.log(this.myNewNotifications);
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  // test(){
  //   this.odooProv.createOrwrite([[2],{}])
  // }

}
