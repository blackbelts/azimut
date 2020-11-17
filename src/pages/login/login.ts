import { TabsPage } from './../tabs/tabs';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, Platform } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { OdooProvider } from '../../providers/odoo/odoo';
import { UtilsProvider } from '../../providers/utils/utils';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from "../../providers/language.service";
import { LanguageModel } from "../../models/language.model";
import { HttpClient } from '@angular/common/http';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public frmData: any;
  languages : Array<LanguageModel>;
  selectedLanguage:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ev: Events,
    private common: CommonProvider,
    public platform: Platform,
    private menu: MenuController,
    public translate: TranslateService,
    public languageService: LanguageService,
    public odooProv: OdooProvider,
    public utils: UtilsProvider,
    public http: HttpClient
  ) {
    this.selectedLanguage =localStorage.getItem("lang")/*  this.languageService.getLanguage() */;
    console.log(this.selectedLanguage)
    this.languages = this.languageService.getLanguages();
    this.frmData = { email: '', password: '' }
    console.log('x')
    
  }
  frmSubmit() {
    
    /* var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var chk = re.test(String(this.frmData.email).toLowerCase()); */
    if (this.frmData.email == '' || this.frmData.password == '') {
      this.common.showAlert('Both fields are required fields.');
    }
    /*  else if (!chk) {
       this.common.showToast('This is not a valid email');
     } */
    else {
      this.common.showLoading();
      this.odooProv.login(this.frmData.email, this.frmData.password)
        .map(res => res)
        .subscribe((res) => {
          console.log(res)
          if (res.error != undefined) {
            this.common.showAlert('E-mail or Password not vaild')
          }
          else {
            this.odooProv.setUid(res.userId)
            this.odooProv.setPassword(this.frmData.password)
            this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(), "res.users", "search_read", [{ experssion: "%3D", filed: "id", value: this.odooProv.getUid() }], [{ prop: "fields", prop_values: ["employee_ids"] }])
            .map(res2 => res2)
            .subscribe(
              res2 => {
                this.odooProv.setEmployeeId(res2[0].id)
                // this.navCtrl.setRoot(HomePage)
                localStorage.setItem("uid",res.userId)
                localStorage.setItem("password",this.frmData.password)
                this.navCtrl.setRoot(TabsPage)
              })
            
          }
          this.common.hideLoading()
        }, error => {
          this.common.hideLoading()
          console.log(error)
        })
    }

  }
  

  hintAlert() {
    this.common.showAlert('For demo purpose,<br/> Email: demo_agent@gmail.com <br/> Password: 123456');
  }
  
  languageChanged(){
    this.languageService.setLanguage(this.selectedLanguage);
  }


}
