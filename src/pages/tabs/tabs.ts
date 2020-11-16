import { CommonProvider } from './../../providers/common/common';
import { NotificationPage } from './../notification/notification';
import { OdooProvider } from './../../providers/odoo/odoo';
import { HomePage } from './../home/home';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';



/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = ProfilePage;
  tab2Root = HomePage;
  tab3Root = NotificationPage;
  myIndex: number;
  profile;
  num: number = 0;
  list;
  notifications;
  myNewNotifications: any[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private odooProv: OdooProvider,
    public common: CommonProvider,
    public app:MyApp
  ) {
    this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(), "res.users",
      "search_read", [{ experssion: "%3D", filed: "id", value: this.odooProv.getUid() }],
      [{ prop: "fields", prop_values: ["name"] }]).map(res => res)
      .subscribe(res => {
        this.profile = { data: res[0].name }
        console.log(res)

      });
    console.log(this.common.notifications.length)
    this.num = this.common.notifications.length
    /*  this.odooProv.createOrwrite(
       {
         uid: this.odooProv.getUid(),
         password: this.odooProv.getPassword(),
         modalname: "smart.notification",
         method: "get_notifications",
         parmlist: [
           this.odooProv.getUid()
         ]
       }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ).map(res => res)
       .subscribe(res => {
         console.log(res)
         this.notifications = res
         this.notifications.forEach(rec => {
           rec.useer.forEach(id => {
             if (id == this.odooProv.getUid()) {
               this.myNewNotifications.push(rec);
             }
           });
         })
         this.num = this.myNewNotifications.length
       });
  */
    this.myIndex = navParams.data.tabIndex || 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  changeNum() {
    this.app.interval.unsubscribe();
    this.app.interval.remove();
    /* this.num = 0 */
    /* console.log(this.num) */
  }

}
