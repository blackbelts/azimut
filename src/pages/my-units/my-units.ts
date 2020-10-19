import { CommonProvider } from './../../providers/common/common';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { OdooProvider } from '../../providers/odoo/odoo';


@IonicPage()
@Component({
  selector: 'page-my-units',
  templateUrl: 'my-units.html',
})
export class MyUnitsPage {
  units
  resobjunits
  resobjproducts
  name
  product_name
  empUnits
  compUnits
  compBoosters
  empBoosters
  data
  Pname
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public odooProv: OdooProvider,
    public common: CommonProvider
    ) {
    this.units = 0.0
    this.empUnits = 0.0
    this.compUnits = 0.0
    this.compBoosters = 0.0
    this.empBoosters = 0.0
    this.data = []
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
          this.units = 0.0
          this.empUnits = 0.0
          this.compUnits = 0.0
          this.compBoosters = 0.0
          this.empBoosters = 0.0
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
              this.units = 0.0
              this.empUnits = 0.0
              this.compUnits = 0.0
              this.compBoosters = 0.0
              this.empBoosters = 0.0
              // var resobjunits: any = []
              
              this.resobjunits = res
              console.log(this.resobjunits)
              this.resobjunits.forEach(rec => {
                if (rec.state == 'surrender'){
                  this.data.push({'name': rec.product[1],'units': 0.0, 'empUnits': 0.0, 'compUnits': 0.0, 'empBoosters': 0.0, 'compBoosters': 0.0})
                  this.Pname = rec.product[1]  
                  this.units = 0.00
                  this.empUnits = 0.00
                  this.compUnits = 0.00
                  this.empBoosters = 0.00
                  this.compBoosters = 0.00
                } 
                else{
                  
                  this.Pname = rec.product[1]
                  this.units += rec.total_units
                  this.empUnits += rec.own_units
                  this.compUnits += rec.company_units
                  this.empBoosters += rec.emp_booster_units
                  this.compBoosters += rec.comp_booster_units
                  
                
                }
              });
              this.data.push({'name': this.Pname,'units': this.units, 'empUnits': this.empUnits, 'compUnits': this.compUnits, 'empBoosters': this.empBoosters, 'compBoosters': this.compBoosters})
      
          })
          
      
          
        });
      })
      console.log(this.data);
    
  }
  openDetails(i) {
    this.data[i].open = !this.data[i].open;
  }
  // getData(i){
  //   this.units = 0.0
  //   this.empUnits = 0.0   
  //   this.empBoosters = 0.0
  //   this.compBoosters = 0.0
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
  //       console.log(this.resobjproducts[i].name)
  //       this.resobjunits = res
  //       console.log(this.resobjunits)
  //       this.resobjunits.forEach(rec => {
  //         if (rec.state == 'surrender'){
  //           this.name = rec.product[1]  
  //           this.units = 0.00
  //           this.empUnits = 0.00
  //           this.compUnits = 0.00
  //           this.empBoosters = 0.00
  //           this.compBoosters = 0.00
  //         } 
  //         else{
  //           // this.name = rec.product[1]
  //           this.units += rec.total_units
  //           this.empUnits += rec.own_units
  //           this.compUnits += rec.company_units
  //           this.empBoosters += rec.emp_booster_units
  //           this.compBoosters += rec.comp_booster_units
          
  //         }
  //       });

  //   })
  // }

}
