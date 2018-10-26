import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class InventoryService {

  constructor(private _http: Http) {
    console.log("Service is ready!");

  }
  closeResult: string;
  /**
   * Add new entry via api
   * @param entryData 
   */
  addEntry(entryData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('http://34.219.70.13/inventory', JSON.stringify(entryData), { headers: headers })
      .map(res => res.json())
  }

  /**
   * Get overview on particular date
   * @param entryData 
   */
  getOverview(date) {
    var headers = new Headers();
    return this._http
      .get('http://34.219.70.13/inventory/'+date)
      .map(res => res.json())
  }

}
