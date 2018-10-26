import { Component } from '@angular/core';
import { InventoryService } from './services/inventory.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { OverviewComponent } from './overview/overview.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InventoryService],
})

export class AppComponent {

  mainTitle = 'All Projects';
  title: string;
  id: number;
  Projects: any;
  validTitle = true;
  last_page: any;
  _last_page: number;
  current_page: number;
  total_Project: number;
  per_page: number;
  selectedProject: string;
  successMessage: boolean;
  errorMessage: boolean;
  successMessageText: string;
  errorMessageText: string;
  disablePrev: boolean;
  disableNext: boolean;
  inputFocused: boolean;
  isInEdit: boolean;
  index: number;
  formdata;


  constructor(private _InventoryService: InventoryService, private _modalService: NgbModal) {
    this.inputFocused = false;
    this.index = 0;
  }


  ngOnInit() {


  }


  buy() {
    const modal =  this._modalService.open(BuyComponent);
  }

  sell() {
    const modal =  this._modalService.open(SellComponent);
  }
  overview() {
    const modal =  this._modalService.open(OverviewComponent);
  }
  
}