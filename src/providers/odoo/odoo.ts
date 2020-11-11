import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/*
  Generated class for the OdooProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/* const odooUrl = "http://178.128.197.205/odooApi/index.php?"; */
// const odooUrl = "http://207.154.195.214/odooApi/index.php?";
const odooUrl = "http://207.154.195.214/apiDemo/index.php?";
@Injectable()
export class OdooProvider {
  private uid;
  private password;
  private employeeId;
  constructor(public http: HttpClient, private Http: Http) {
    this.login("", "");
  }
  login(userName, password) {
    return this.http.get(
      odooUrl +
      "username=" + userName +
      "&password=" + password)
      .map((response) => {
        return JSON.parse(JSON.stringify(response));
      });
  }
  setUid(uid) {
    this.uid = uid
  }
  getUid() {
    return this.uid
  }
  setPassword(pass) {
    this.password = pass
  }
  getPassword() {
    return this.password
  }
  setEmployeeId(empId) {
    this.employeeId = empId
  }
  getEmployeeId() {
    return this.employeeId
  }
  getUnits(uid, password, modal, method, id) {
    return this.http.get(
      odooUrl + "uid=" + uid +
      "&password=" + password +
      "&modalname=" + modal +
      "&method=" + method + "&parmlist[0]=id&parmlist[1]=" + id)

  }
  /* setRes_user_id(id) {
    this.res_user_id = id
  }
  getRes_user_id() {
    return this.res_user_id
  } */
  
  getOdooData(uid, password, modal, method, domains = [], mapList = []) {
    return this.http.get(this.makeHttpUrl(uid, password, modal, method, domains, mapList))
  }
  makeHttpUrl(uid, password, modal, method, domains = [], mapList = []) {
    console.log(odooUrl +
      "uid=" + uid +
      "&password=" + password +
      "&modalname=" + modal +
      "&method=" + method +
      (method == "create" ? this.makeDomainQueryForCreate(domains) : this.makeDomainQuery(domains)) +
      this.makeMappingList(mapList))
    return (
      odooUrl +
      "uid=" + uid +
      "&password=" + password +
      "&modalname=" + modal +
      "&method=" + method +
      (method == "create" ? this.makeDomainQueryForCreate(domains) : this.makeDomainQuery(domains)) +
      this.makeMappingList(mapList)
    );
  }
  makeDomainQueryForCreate(domains = []) {
    let domainStr = "&parmlist[0]";
    if (domains.length != 0) {
      let i = 0;
      domains.forEach(dom => {
        domainStr += "[" + dom.filed + "]=" + dom.value
        i++;
        if (i < domains.length) domainStr += "&parmlist[0]";
      });
      return domainStr;
    } else {
      return "";
    }
  }
  makeMappingList(mapList = []) {
    if (mapList.length != 0) {
      let mapStr = "&mappinglist[";
      let j = 0;
      mapList.forEach(map => {
        if (map.prop == "fields") {
          for (let i = 0; i < map.prop_values.length; i++) {
            mapStr += map.prop + "][" + i + "]=" + map.prop_values[i];
            if (i < map.prop_values.length - 1) {
              mapStr += "&mappinglist[";
            }
          }
        } else {
          mapStr += map.prop + "]"
          for (let i = 0; i < map.prop_values.length; i++) {
            mapStr += "=" + map.prop_values[i];
            if (i < map.prop_values.length - 1) {
              mapStr += "&mappinglist[";
            }
          }
        }
        j++;
        if (j < mapList.length) mapStr += "&mappinglist[";
      });
      return mapStr;
    } else {
      return "";
    }
  }
  /* make domain string */
  makeDomainQuery(domains = []) {
    let domainStr
    if (typeof domains[0] == "string" || typeof domains[0] == "number") {
      let index = 0;
      domains.forEach(dom => {
        domainStr = "&parmlist[" + index + "]=" + dom
        index++;
      })
      return domainStr
    }
    domainStr = "&parmlist[0]";
    if (domains.length != 0) {
      let i = 0;
      domains.forEach(dom => {
        domainStr += "[" + i + "]" + "[0]=" +
          dom.filed + "&parmlist[0]" + "[" +
          i + "][1]=" + dom.experssion;
        if (Array.isArray(dom.value)) {
          let j = 0
          dom.value.forEach(element => {
            domainStr += "&parmlist[0]" + "[" + i + "][2][" + j + "]=" + element
            j++;
          });
        } else {
          domainStr += "&parmlist[0][" + i + "][2]=" + dom.value
        }
        i++;
        if (i < domains.length) domainStr += "&parmlist[0]";
      });
      return domainStr;
    } else {
      return "";
    }
  }
  createOrwrite(data) {
    data = JSON.stringify(data)
    console.log(data)
    return this.http.post(odooUrl, data)
    
  }

  // nodeLogin(data){
  //   data['url'] = "http://207.154.195.214"
  //   data['port'] = "8080"
  //   data['db'] = "Fund_Demo_Test"
  //   data = JSON.stringify(data)
  //   const url = 'http://207.154.195.214:4002/api/login'
  //   return this.Http.post(url,data)
  // }
  // callMethod(data){
  //   let headers = new Headers(
  //     {
  //       'Content-Type' : 'application/json',
  //       ''
  //     });
  //     let options = new RequestOptions({ headers: headers });
  // }
}