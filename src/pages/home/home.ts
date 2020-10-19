import { ProductsPage } from './../products/products';
import { ReportsPage } from './../reports/reports';
import { LoginPage } from './../login/login';
import { LoanPage } from './../loan/loan';
import { MyinvestsPage } from './../myinvests/myinvests';
import { MysubsPage } from './../mysubs/mysubs';
import { FundPerformancePage } from './../fund-performance/fund-performance';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { OdooProvider } from '../../providers/odoo/odoo';
import { MyUnitsPage } from '../my-units/my-units';
import { SurrenderPage } from '../surrender/surrender';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from "../../providers/language.service";
import { LanguageModel } from "../../models/language.model";
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  profile: any = {}
  sub
  units
  resobjunits
  products
  price
  rate
  name
  title: string;
  // languageSelected : any = 'en';
  languages : Array<LanguageModel>;
  selectedLanguage:string;
  constructor(
    public navCtrl: NavController,
    public common: CommonProvider,
    public navParams: NavParams,
    public odooProv: OdooProvider,
    public app: App,
    public translate: TranslateService,
    public languageService: LanguageService,
    public http: HttpClient,
    private alertCtrl: AlertController
  ) {
    
    this.selectedLanguage = this.languageService.getLanguage();
    this.languages = this.languageService.getLanguages();
    this.sub = 0.0
    this.units = 0.0
    this.price = 0.0
    this.common.showLoading()

    // this.http.post('http://207.154.195.214:4000/call_method/travel_agemcy/demo/demo/policy.travel/get_quote',{parmlist:['individual',['1999-1-8'],'2020-1-3','2020-1-5','zone 1']})
    //   .map((response) => {
    //     console.log(response)
    //     console.log(JSON.parse(JSON.stringify(response)));
    //   });
    
       this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(), "ppf.fund",
       "search_read", [],
        []).map(res => res)
         .subscribe(res => {
         })
    this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(), "res.users",
     "search_read", [{ experssion: "%3D", filed: "id", value: this.odooProv.getUid() }],
      [{ prop: "fields", prop_values: ["name"] }]).map(res => res)
       .subscribe(res => {
         this.name = res[0].name
         this.setprofile(res[0].name)
         this.common.hideLoading()
         this.odooProv.getOdooData(
          /* "1",
          "admin", */
          this.odooProv.getUid(),
          this.odooProv.getPassword(),
          "ppf.subscription.line",
          "search_read",
          [{ experssion: "%3D", filed: "member_name.name", value: this.name }]
        ).map(res => res)
          .subscribe(res => {
            // var resobjunits: any = []
            this.resobjunits = res
            
            this.resobjunits.forEach(rec => {
              
              this.sub += rec.total
            })
          })
         this.odooProv.getOdooData(
          /* "1",
          "admin", */
          this.odooProv.getUid(),
          this.odooProv.getPassword(),
          "ppf.unit",
          "search_read",
          [{ experssion: "%3D", filed: "name", value: this.name }]
        ).map(res => res)
          .subscribe(res => {
            // var resobjunits: any = []
            this.resobjunits = res
            
            this.resobjunits.forEach(rec => {
              
              this.units += rec.total_units
              this.odooProv.getOdooData(
              /* "1",
              "admin", */
              this.odooProv.getUid(),
              this.odooProv.getPassword(),
              "product.template",
              "search_read",
              []
            ).map(res => res)
              .subscribe(res => {
                // var resobjunits: any = []
                this.products = res
                this.products.forEach(rec => {
                  this.price = rec.price
                  this.rate = (((this.price * this.units) - this.sub) / this.sub)*100 
                })
                
                
              })
            });
    
          })

       })
    
      
  }
  gotoprofile(data) {
    this.navCtrl.push(ProfilePage,{data})
  }
  gotounits(data){
    this.navCtrl.push(MyUnitsPage,{data})
  }
  gotosubs(data){
    this.navCtrl.push(MysubsPage,{data})
  }
  gotoinvests(data){
    this.navCtrl.push(MyinvestsPage,{data})
  }
  gotoloans(data){
    this.navCtrl.push(LoanPage,{data})
  }
  gotosurrenders(data,date){
    this.navCtrl.push(SurrenderPage,{data,date})
  }
  goToRepors(){
    this.navCtrl.push(ReportsPage)
  }
  goToProducts(){
    this.navCtrl.push(ProductsPage)
  }
  setprofile(pro) {
    this.profile = pro
  }
  doRefresh(refresher) {
  }
  logout(){
    // let nav = this.app.getRootNav()
    // nav.push("LoginPage")
    // this.navCtrl.push(LoginPage)
    // this.navCtrl.setRoot(LoginPage)
    this.app.getRootNav().setRoot(LoginPage)
  }
  gotofundPerformance(){
    this.navCtrl.push(FundPerformancePage)
  }
  // setLanguage(){
  //   let defaultLanguage = this.translate.getDefaultLang();
  //   if(this.languageSelected){
  //     this.translate.setDefaultLang(this.languageSelected);
  //     this.translate.use(this.languageSelected);
  //   }else{
  //     this.languageSelected = defaultLanguage;
  //     this.translate.use(defaultLanguage);
  //   }
  // }
  languageChanged(){
    this.languageService.setLanguage(this.selectedLanguage);
  }
  surrenderAllert(){
    let alert = this.alertCtrl.create({
      title: this.allertTranslate('Surrender'),
      message: 'Date of Surrender',
      inputs: [
        {
          name: 'surrenderDate',
          placeholder: 'Date of Surrender',
          type: 'date'
        }
      ],
      buttons: [
        {
          text: 'Submit',
          role: 'Submit',
          handler: date => {
            this.gotosurrenders(this.profile,date);
          }
        },
        
      ]
    });
    alert.present();
  }
  allertTranslate(key){
    this.translate.get(key).subscribe((res) => {
      this.title = res;
      
   });
   return this.title;
    
  }

  
}
