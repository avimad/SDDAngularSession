import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../../models/Customer';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit, OnDestroy {

  customerForm: FormGroup;
  customer: Customer = {};
  customers: Customer[] = [];

  formErrors = {
    'firstname': '',
    'lastname': '',
    'email': ''
  };
  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };
  constructor(private fb: FormBuilder, private demoservice: DemoService) {
    this.createForm();
  }
  ngOnInit() {

  }
  // Create New Form
  createForm() {
    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.customerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  // validation handler
  onValueChanged(data?: any) {
    if (!this.customerForm) { return; }
    const form = this.customerForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.customer = this.customerForm.value;
    this.demoservice.createCustomer(this.customer).subscribe(res => {
      this.customerForm.reset({
        firstname: '',
        lastname: '',
        email: '',
      });
    }, errmess => console.log(errmess));

  }
  ngOnDestroy(): void {
  }
}
