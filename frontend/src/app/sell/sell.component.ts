import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbTimeStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
  providers: [InventoryService]
})
export class SellComponent implements OnInit {
  successMessage: boolean;
  errorMessage: boolean;
  errors: any;
  successMessageText: string;
  errorMessageText: string;
  formdata;

  constructor(private _InventoryService: InventoryService, private activeModal: NgbActiveModal, private calendar: NgbCalendar) {
  }

  ngOnInit() {
    this.formdata = new FormGroup({
      sellDate: new FormControl("", Validators.compose([
        Validators.required
      ])),
      quantity: new FormControl("", Validators.compose([
        Validators.required
      ]))
    });
    this.successMessage = false;
    this.errorMessage = false;
  }
  /**
   * Add a new sell entry
   * @param Entry 
   */
  addEntry(Entry) {
    this.successMessage = false;
    this.errorMessage = false;

    let formattedDate = Entry.sellDate.year+'-'+this.pad(Entry.sellDate.month)+'-'+this.pad(Entry.sellDate.day);
    let result;
    let entryData = {
      action: "sell",
      date: formattedDate,
      quantity: Entry.quantity,
    }
    result = this._InventoryService.addEntry(entryData);
    result.subscribe((data) => {
      if (data.success) {
        this.successMessage = true;
        this.successMessageText = "Entry has been added!";
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

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  closeSellModal() {
    this.activeModal.close();
  }


}
