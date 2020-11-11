import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { TranslateService } from '@ngx-translate/core';
import { OdooProvider } from '../../providers/odoo/odoo';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile: any = {}
  public frmData: any;
  public overlayIcon: any;
  public frmVArray: any;
  public result: any;
  public commFields: any;
  token: any
  notHaveAccount: boolean
  tranValues: any
  department
  departments
  name
  constructor(
    private common: CommonProvider,
    public navParams: NavParams,
    private ev: Events,
    public navCtrl: NavController,
    public app: App,
    public translate: TranslateService,
    public odooProv: OdooProvider,


  ) {

   this.name = navParams.get('data')
   
    
    this.odooProv.getOdooData(
      /*  "1",
       "admin", */
       this.odooProv.getUid(),
       this.odooProv.getPassword(),
       "res.partner",
       "search_read",
       [{ experssion: "%3D", filed: "name", value: this.name }]
     ).map(res => res)
       .subscribe(res => {
         console.log(res)
         this.setprofile(res[0])
         this.common.hideLoading()
         this.department = res[0].department[1]
         
       })
    
  }
  ionViewDidLoad() {
    
  }
  setprofile(pro) {
    this.profile = pro
  }
  //-----------------------
  autoValidate(index, value) {
    if (value != '') {
      this.frmVArray[index] = ''
    } else {
      this.frmVArray[index] = 'ngR';
    }
  }
  /*  frmSubmit() {
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     var chk = re.test(String(this.frmData.email).toLowerCase());

     this.frmVArray = ['', '', '', '', '', ''];
     let isValid = true;
     if (this.frmData.fullname == '') this.frmVArray[0] = 'ngR';
     if (this.frmData.email == '') this.frmVArray[1] = 'ngR';
     else if (!chk) { this.common.showToast('This is not a valid email'); }
     if (this.frmData.phone_number == '') this.frmVArray[2] = 'ngR';
     //    if(this.frmData.brokerrage_address=='') this.frmVArray[3]   = 'ngR';
     if (this.frmData.license == '') this.frmVArray[4] = 'ngR';

     for (var i = 0; i < this.frmVArray.length; i++) {
       if (this.frmVArray[i] != '') isValid = false;
     }
     if (isValid) {
       this.common.showLoading();
       console.log(this.frmData);
       this.common.showAlert('Your profile has been updated');
       this.common.hideLoading();
     }

   } */
  notification() {
    let nav = this.app.getRootNav()
    nav.push('PropertyFormPage');
  }
  login() {
    let nav = this.app.getRootNav()
    nav.push("LoginPage")
  }
  createAccount() {
    let nav = this.app.getRootNav()
    nav.push("RegisterPage")
  }
  userproperties() {
    this.navCtrl.push("ClientPropPage")
  }
  updateaccount() {
    /* console.log(this.frmData)
      let nav = this.app.getRootNav()
      nav.push("RegisterPage", { userdata:this.frmData}) */
  }
  logout() {
   
  }
}
