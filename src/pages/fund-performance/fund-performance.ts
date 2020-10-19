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
  // lastData: []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public odooProv: OdooProvider,) {
    this.data = []
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
                  list.push(parseInt(rec.performance))
                  

                  // console.log(list);
                })
              })
          
          this.allData.push({name: entry.name, data:list})
          
          
          
        }
        let colors = ['#3e95cd','#8e5ea2','#3cba9f','#e8c3b9','#c45850','#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
        
        let i = 0;
        for (let prod of this.allData){
          this.datasets.push({
            data: prod.data,
            label: prod.name,
            borderColor: colors[i],
            fill: false
          })
          i ++;
        }
        let element = document.getElementById("line-chart")
        // let ctx = document.getElementById("myChart");
        element.style.height = '800';
        // element.style.width = '128px';
        this.bars = new Chart(document.getElementById("line-chart"), {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
            'Nov', 'Dec'],
            datasets: this.datasets
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
      
  }, 1000);
//   setTimeout(() => {
//     for (let entry of this.resobjproductpricing) {
//       let element = document.getElementById('barChart' + this.resobjproductpricing.indexOf(entry));
//       this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(),
//           "product.pricing","search_read", [{ experssion: "%3D", filed: "product_price.name",
//           value: entry.name }], 
//           []).map(res => res)
//           .subscribe(res => {
//             this.data = []
//             this.productPricing = res
//             this.productPricing.forEach(rec => {
//               this.data.push(rec.price)
//               this.data.splice(1, -1)
//               // console.log(this.data);
//             this.bars = new Chart(element, {
//               // renderTo: this,
//               type: 'line',
//               data: {
//                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
//                  'Nov', 'Dec'],
//                 datasets: [{
//                   label: 'Price',
//                   data: this.data,
//                   backgroundColor: 'rgb(50, 97, 149)', // array should have same number of elements as number of dataset
//                   borderColor: 'rgb(50, 97, 149)',// array should have same number of elements as number of dataset
//                   fill: false,
//                   borderWidth: 1
                  
//                 }]
//               },
//               options: {
//                 scales: {
//                   xAxes: [{
//                     ticks: {
//                       autoSkip: false
//                     }
//                   }],
//                   yAxes: [{
//                     ticks: {
//                       beginAtZero: true,
//                     }
//                   }]
//                 }
//               },
//             });
          
//         })
//     })
//     // this.bars.update();
//   // console.log('12')
// }
// }, 1000);
  }
  openDetails(i) {
    this.resobjproductpricing[i].open = !this.resobjproductpricing[i].open;
  }

  graph(){
    this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(),
     "product.template","search_read", [{ experssion: "%3D", filed: "type",
      value: 'financial' }], 
      [{ prop: "fields", prop_values: ["name"] }]).map(res => res)
       .subscribe(res => {
        this.resobjproductpricing = res
        // console.log(this.resobjproductpricing)
        this.resobjproductpricing.forEach(rec => {
          // console.log(rec)
          // this.name = rec.name
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
            let element = document.getElementById('barChart' +  this.resobjproductpricing.indexOf(rec));
            this.bars = new Chart(element, {
              // renderTo: this,
              type: 'line',
              data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
                 'Nov', 'Dec'],
                datasets: [{
                  label: 'Price',
                  data: this.data,
                  backgroundColor: 'rgb(50, 97, 149)', // array should have same number of elements as number of dataset
                  borderColor: 'rgb(50, 97, 149)',// array should have same number of elements as number of dataset
                  fill: false,
                  borderWidth: 1
                  
                }]
              },
              options: {
                scales: {
                  xAxes: [{
                    ticks: {
                      autoSkip: false
                    }
                  }],
                  yAxes: [{
                    ticks: {
                      min: 0,
                      stepSize: 5,            
                      beginAtZero: true,
                    }
                  }]
                }
              },
            });
          // }
          
        })
       })
  }
  
}
