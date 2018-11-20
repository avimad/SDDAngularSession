import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemoService } from '../../services/demo.service';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  customer: Customer = {};

  constructor(private demoservice: DemoService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.demoservice.getCustomers().subscribe(res => {
    this.customers = res;
    }, err => {
      console.log(err);
    });
  }
  ngOnDestroy(): void {
  }
}
