import { OdooProvider } from './../../providers/odoo/odoo';
import { Component, ViewChild , ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

/**
 * Generated class for the FundPerformancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fund-performance',
  templateUrl: 'fund-performance.html',
})
export class FundPerformancePage {
  @ViewChild('barChart') barChart: ElementRef;
  // @ViewChildren(canvas) viewChildren!: QueryList<canvas>;

  
  bars: any;
  colorArray: any;
  resobjproductpricing
  productPricing
  data: number[]
  name;
  allData :any[] = [];
  datasets: any[] = []
  quarterData;
  products;
  keys;
  monthlyBars: any;
  year;
  // lastData: []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public odooProv: OdooProvider,) {
    this.data = []
    this.querterPerformance(new Date().getFullYear().toString());
    
    this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(),
     "product.template","search_read", [{ experssion: "%3D", filed: "type",
      value: 'financial' }], 
      [{ prop: "fields", prop_values: ["name"] }]).map(res => res)
       .subscribe(res => {
        this.resobjproductpricing = res
        // console.log(this.resobjproductpricing)
        this.resobjproductpricing.forEach(rec => {
          // console.log(rec)
          this.name = rec.name
          // for (let i in this.productPricing) {
            this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(),
            "product.pricing","search_read", [{ experssion: "%3D", filed: "product_price.name",
            value: rec.name }], 
            []).map(res => res)
            .subscribe(res => {
              this.productPricing = res
              this.productPricing.forEach(rec => {
                this.data.push(rec.performance)
                this.data.splice(1, -1)
                // console.log(this.data)
                
              })
            })
          // }
          
        })
       })
      //  for (let entry of this.resobjproductpricing) {
      //   // let list = [];
      //   this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(),
      //       "product.pricing","search_read", [{ experssion: "%3D", filed: "product_price.name",
      //       value: entry.name }], 
      //       []).map(res => res)
      //       .subscribe(res => {
      //         // this.data = []
      //         this.productPricing = res
      //         console.log(res)
      //         // this.productPricing.forEach(rec => {
                
      //         //   // list.push(rec.price)
      //         //   // this.data.splice(1, -1)
      //         //   // console.log(list);
      //         // })
      //       })
      // }
  }

  ionViewDidLoad() {
    setTimeout(() => {
      for (let entry of this.resobjproductpricing) {
          let list = [];
          this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(),
              "product.pricing","search_read", [{ experssion: "%3D", filed: "product_price.name",
              value: entry.name }], 
              []).map(res => res)
              .subscribe(res => {
                // this.data = []
                this.productPricing = res
                // console.log(res)
                this.productPricing.forEach(rec => {
                  list.push(rec.performance)
                  

                  // console.log(list);
                })
              })
          
          this.allData.push({name: entry.name, data:list})     
          
        }
        
      
  }, 1000);
  }
  openDetails(item) {
    this.quarterData[item].open = !this.quarterData[item].open;
    const labels = Object.keys(this.quarterData[item])
    const data = []
    let monthlyData = []
    for (let rec of labels){
      data.push(this.quarterData[item][rec])
    }
    for (let prod of this.allData){
      if (prod.name == item){
        monthlyData = prod.data.slice(Math.max(prod.data.length - 12, 1))
      } 
    }
    this.bars = new Chart(document.getElementById('quarter-'+item), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Price',
          data: data,
          backgroundColor: 'rgb(50, 97, 149)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(50, 97, 149)',// array should have same number of elements as number of dataset
          fill: false,
          borderWidth: 1
          
        }]
      },
      options: {
        title: {
          display: false,
          text: 'Product Performance Per Price'
        },
        animation: {
          duration: 2000 // general animation time
        },
        // responsive: false,
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: false,
            

            },

          }],
          yAxes: [{
            ticks: {
            
              // beginAtZero: true,
              fontSize: 10
            },
            
          }]
        }

      }
    })
    this.monthlyBars = new Chart(document.getElementById('monthly-'+item), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
        'Nov', 'Dec'],
        datasets: [{
          label: 'Price',
          data: monthlyData,
          backgroundColor: 'rgb(50, 97, 149)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(50, 97, 149)',// array should have same number of elements as number of dataset
          fill: false,
          borderWidth: 1
          
        }]
      },
      options: {
        title: {
          display: false,
          text: 'Product Performance Per Price'
        },
        animation: {
          duration: 2000 // general animation time
        },
        // responsive: false,
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: false,
            

            },

          }],
          yAxes: [{
            ticks: {
            
              // beginAtZero: true,
              fontSize: 10
            },
            
          }]
        }

      }
    })
  }

  querterPerformance(year){
    this.odooProv.createOrwrite({
      uid: this.odooProv.getUid(),
      password: this.odooProv.getPassword(),
      modalname: "product.template",
      method: "get_quarter_performance",
      parmlist: [
        year
        ]
      })
      .map(res => res)
      .subscribe(res => {
        console.log(res)
        this.quarterData = res
        this.products = Object.keys(this.quarterData);
        // this.keys = Object.keys(this.mainObject);
      })

  }
  
}
