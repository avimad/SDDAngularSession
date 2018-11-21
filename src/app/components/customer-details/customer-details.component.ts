import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { DemoService } from '../../services/demo.service';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnChanges, OnDestroy {
  customers: Customer[] = [];
  @Input() customer: Customer = {};

  constructor(private demoservice: DemoService) { }
  ngOnChanges(): void {
    this.customers.push(this.customer);
  }
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
