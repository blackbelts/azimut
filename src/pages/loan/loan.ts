import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OdooProvider } from '../../providers/odoo/odoo';
import { CommonProvider } from '../../providers/common/common';
/**
 * Generated class for the LoanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loan',
  templateUrl: 'loan.html',
})
export class LoanPage {
  loanUnitsTaken
  resobjLoans
  name
  product_name
  loanUnitsTakenValue
  totalUnitsOwned
  unitsOwnedValue		
  totalUnitsAfterLoan		
  unitsAfterLoanValue	 
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public odooProv: OdooProvider,
    public common: CommonProvider,

    ) {
    this.loanUnitsTaken = 0.0
    this.loanUnitsTakenValue = 0.0
    this.totalUnitsOwned = 0.0
    this.unitsOwnedValue = 0.0
    this.totalUnitsAfterLoan = 0.0
    this.unitsAfterLoanValue = 0.0

    
    this.name = navParams.get('data')
    this.odooProv.getOdooData(
      /* "1",
      "admin", */
      this.odooProv.getUid(),
      this.odooProv.getPassword(),
      "ppf.loan",
      "search_read",
      [{ experssion: "%3D", filed: "employee_name", value: this.name }]
    ).map(res => res)
      .subscribe(res => {
        // var resobjunits: any = []
        this.resobjLoans = res
        this.resobjLoans.forEach(rec => {
          this.loanUnitsTaken += rec.loan_units_taken
          this.loanUnitsTakenValue += this.common.getFomatedPrice(rec.loan_amount.toFixed())
          this.totalUnitsOwned += rec.total_units_owned
          this.unitsOwnedValue += this.common.getFomatedPrice(rec.value_of_units_owned.toFixed())
          this.totalUnitsAfterLoan += rec.total_units_after_loan
          this.unitsAfterLoanValue += this.common.getFomatedPrice(rec.value_of_units_after_loan.toFixed())
          
          
        });
    })

    
  }
  
}
