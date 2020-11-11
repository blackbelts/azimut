import { CommonProvider } from './../../providers/common/common';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OdooProvider } from '../../providers/odoo/odoo';

/**
 * Generated class for the MyinvestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myinvests',
  templateUrl: 'myinvests.html',
})
export class MyinvestsPage {
  unitsValue;
  resobjunits;
  resobjproducts;
  name;
  product_name;
  empUnitsValue;
  compUnitsValue;
  empboostersValue;
  compboostersValue;
  invData;
  Pname;
  units;
  total;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public odooProv: OdooProvider,
    public common: CommonProvider,

    ) {
    this.units = 0.0
    this.unitsValue = 0.0
    this.empUnitsValue = 0.0
    this.compUnitsValue = 0.0
    this.empboostersValue = 0.0
    this.compboostersValue = 0.0
    this.total = 0.0
    this.invData = []
    this.name = navParams.get('data')
    this.odooProv.getOdooData(
      /* "1",
      "admin", */
      this.odooProv.getUid(),
      this.odooProv.getPassword(),
      "product.template",
      "search_read",
      [{ experssion: "%3D", filed: "type", value: "financial" }]
    ).map(res => res)
      .subscribe(res => {
        console.log(res)
        this.resobjproducts = res
        this.resobjproducts.forEach(rec => {
          this.unitsValue =0.0        
          this.empUnitsValue = 0.0
          this.compUnitsValue = 0.0
          this.empboostersValue =0.0 
          this.compboostersValue =0.0 
          this.odooProv.getOdooData(
            /* "1",
            "admin", */
            this.odooProv.getUid(),
            this.odooProv.getPassword(),
            "ppf.unit",
            "search_read",
            [{ experssion: "%3D", filed: "name", value: this.name },
            { experssion: "%3D", filed: "product.name", value: rec.name }]
          ).map(res => res)
            .subscribe(res => {
              this.unitsValue =0.0        
              this.empUnitsValue = 0.0
              this.compUnitsValue = 0.0
              this.empboostersValue =0.0 
              this.compboostersValue =0.0 
              // var resobjunits: any = []
              this.resobjunits = res
              console.log(this.resobjunits);
              this.resobjunits.forEach(rec => {
                this.Pname = rec.product[1]
                this.units += rec.total_units
                this.unitsValue += rec.today_total_value
                this.empUnitsValue += rec.today_own_units_value
                this.compUnitsValue += rec.today_comp_units_value
                this.empboostersValue += rec.today_emp_booster_units_value
                this.compboostersValue += rec.today_comp_booster_units_value
                
              })
              this.total += this.unitsValue;
              this.invData.push({'name': this.Pname,'unitsValue': this.common.getFomatedPrice(this.unitsValue), 'units': this.units, 'empUnitsValue': this.common.getFomatedPrice(this.empUnitsValue), 'compUnitsValue': this.common.getFomatedPrice(this.compUnitsValue), 'empboostersValue': this.common.getFomatedPrice(this.empboostersValue), 'compBoosters': this.common.getFomatedPrice(this.compboostersValue)})
              console.log(this.invData)

            })
            
            
          })
          
        })
        // this.invData.array.forEach(element => {
        //   this.total += element.unitsValue
          
        // });
      
      
    
  }
  openDetails(i) {
    
    this.invData[i].open = !this.invData[i].open;
  //   this.odooProv.getOdooData(
  //     /* "1",
  //     "admin", */
  //     this.odooProv.getUid(),
  //     this.odooProv.getPassword(),
  //     "ppf.unit",
  //     "search_read",
  //     [{ experssion: "%3D", filed: "name", value: this.name },
  //     { experssion: "%3D", filed: "product.name", value: this.resobjproducts[i].name }]
  //   ).map(res => res)
  //     .subscribe(res => {
  //       // var resobjunits: any = []
  //       this.resobjunits = res
  //       this.resobjunits.forEach(rec => {
  //         this.unitsValue += rec.today_total_value
  //         this.empUnitsValue += rec.today_own_units_value
  //         this.compUnitsValue += rec.today_comp_units_value
  //         this.empboostersValue += rec.today_emp_booster_units_value
  //         this.compboostersValue += rec.today_comp_booster_units_value
          

  //       });

  //   })  
  }

}