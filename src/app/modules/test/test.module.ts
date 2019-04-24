import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { CreateComponent } from './components/create/create.component';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
