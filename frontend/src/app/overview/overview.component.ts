import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbTimeStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [InventoryService]
})
export class OverviewComponent implements OnInit {
  data: any;
  successMessage: boolean;
  errorMessage: boolean;
  errors: any;
  processedValues: any;
  successMessageText: string;
  errorMessageText: string;
  formdata;

  constructor(private _InventoryService: InventoryService, private activeModal: NgbActiveModal, private calendar: NgbCalendar) {
  }

  ngOnInit() {
    this.formdata = new FormGroup({
      date: new FormControl("", Validators.compose([
        Validators.required
      ]))
    });
    this.successMessage = false;
    this.errorMessage = false;
  }
  /**
   * Add a new overview entry
   * @param Entry 
   */
  getOverview(Data) {
    this.successMessage = false;
    this.errorMessage = false;

    let formattedDate = Data.date.year + '-' + this.pad(Data.date.month) + '-' + this.pad(Data.date.day);

    let result;
    result = this._InventoryService.getOverview(formattedDate);
    result.subscribe((data) => {
      if (data.success) {
        this.processedValues = this.processData(data.data);
      } else {
        this.errorMessage = true;
        this.errorMessageText = "An error occurred, make sure you have entered data correctly";
      }

    }, (err) => {
      //if response code is other than 200
      this.errorMessage = true;
      this.errorMessageText = JSON.parse(err.text());
    });

  }
  /**
   * Process data returned from API
   * @param data 
   */
  processData(data) {

    let buyStock = [];
    let sellStock = [];
    let templateData = [];
    let inventoryItems = 0;

    //iterate transaction data
    for (let entry of data) {
      let action = entry.action;
      let quantity = entry.quantity;
      let unitPrice = entry.unit_price;
      //build FIFO stack for buying action
      if (action === "buy") {
        buyStock.push([{ quantity }, { unitPrice }]);
      }
      if (action === "sell") {
        sellStock.push(quantity);
      }
    }
    let stockPrice = 0;
    let itemRemains = [];
    let finalStockPrice = 0;
    //calculate costs of pen sold til ultimo, based on FIFO pri
    for (let soldItem of sellStock) {
      let itemsNeeded = 0;
      let stockItem = buyStock[0];
      let stockItemQty = stockItem[0].quantity;
      let stockItemPrice = stockItem[1].unitPrice;
      let newStock = stockItemQty - soldItem;
      stockPrice += soldItem * stockItemPrice;

      if (newStock < 0) {
        buyStock.shift(); //remove first item as it is consumed
        itemsNeeded = soldItem - stockItemQty;
        let stockItem = buyStock[0];
        let stockItemQtyTmp = stockItem[0].quantity - itemsNeeded;
        let stockItemPrice = stockItem[1].unitPrice;

        buyStock[0] = [{ 'quantity': stockItemQtyTmp }, { 'unitPrice': stockItemPrice }];
        stockPrice += itemsNeeded * stockItemPrice;
        finalStockPrice = stockPrice;
      } else if (newStock > 0) {
        buyStock[0] = [{ 'quantity': newStock }, { 'unitPrice': stockItemPrice }];

      }
    }
    //calculate inventory value get final items remaining
    let inventoryValue = 0;
    let itemsRemaing = 0;
    for (let item of buyStock) {
      let qty = item[0].quantity;
      let unitPrice = item[1].unitPrice;
      inventoryValue += qty * unitPrice;
      itemsRemaing += qty;
    }

    templateData.push({ 'inventoryItems': itemsRemaing });
    templateData.push({ 'inventoryValue': inventoryValue });
    templateData.push({ 'stockPrice': finalStockPrice });
    return templateData;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  closeOverviewModal() {
    this.activeModal.close();
  }



}
