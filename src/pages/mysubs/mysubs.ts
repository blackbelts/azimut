import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OdooProvider } from '../../providers/odoo/odoo';
import { CommonProvider } from '../../providers/common/common';



/**
 * Generated class for the MysubsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mysubs',
  templateUrl: 'mysubs.html',
})
export class MysubsPage {
  units
  resobjSubs
  name
  product_name
  empSubs
  compSubs
  emp_boosters
  comp_boosters
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public odooProv: OdooProvider,
    public common: CommonProvider,

    ) {
    this.units = 0.0
    this.empSubs = 0.0
    this.compSubs = 0.0
    this.emp_boosters = 0.0
    this.comp_boosters = 0.0
    this.name = navParams.get('data')
    this.odooProv.getOdooData(
      /* "1",
      "admin", */
      this.odooProv.getUid(),
      this.odooProv.getPassword(),
      "ppf.subscription.line",
      "search_read",
      [{ experssion: "%3D", filed: "member_name", value: this.name }]
    ).map(res => res)
      .subscribe(res => {
        // var resobjunits: any = []
        this.resobjSubs = res
        console.log(this.resobjSubs)
        this.resobjSubs.forEach(rec => {
          this.units += rec.total
          this.empSubs += rec.own
          this.compSubs += rec.company
          this.emp_boosters += rec.emp_booster
          this.comp_boosters += rec.comp_booster
          
        });
    })
  }
  
}
