import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OdooProvider } from '../../providers/odoo/odoo';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the SurrenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-surrender',
  templateUrl: 'surrender.html',
})
export class SurrenderPage {
  surrenderAmount
  resobjSurrendes
  name
  product_name
  companyShare
  employeeShare
  emp_booster
  comp_booster
  booster
  today = new Date();
  stToday
  id
  emp_value_expected
  date;
  totalUnits;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public odooProv: OdooProvider,
    public common: CommonProvider,

    ) {
    this.surrenderAmount = 0.0
    this.employeeShare = 0.0
    this.companyShare = 0.0
    this.booster = 0.0
    this.emp_booster =0.0 
    this.comp_booster = 0.0
    this.emp_value_expected =0.0
    var dd = String(this.today.getDay() + 1)
    var mm = String(this.today.getMonth() + 1)
    var yyyy = this.today.getFullYear();
    this.stToday = yyyy + '-' + mm + '-' + dd
    console.log(this.stToday)
    this.name = navParams.get('data')
    this.date =  navParams.get('date').surrenderDate;
    console.log(this.date);
   
        this.odooProv.createOrwrite({
          uid: this.odooProv.getUid(),
          password: this.odooProv.getPassword(),
          modalname: "ppf.surrender",
          method: "get_emp_expected_surr",
          parmlist: [
            this.odooProv.getUid(),
            this.date,
            ]
          })
          .map(res => res)
          .subscribe(res => {
            this.resobjSurrendes = res
            console.log(this.resobjSurrendes)
            this.resobjSurrendes.forEach(rec => {
            // this.employeeShare = parseFloat(rec.employee_share)
            // this.companyShare = parseFloat(rec.company_share)
            // this.emp_booster = parseFloat(rec.emp_booster)
            // this.comp_booster = parseFloat(rec.comp_booster)
            this.emp_value_expected = parseFloat(rec.all_value)
            this.totalUnits = parseFloat(rec.all_units)
            console.log(this.emp_value_expected)
        });
          })
  }
  
}
