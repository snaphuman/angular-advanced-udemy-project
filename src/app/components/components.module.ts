import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementComponent } from './increment/increment.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [IncrementComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    IncrementComponent
  ]
})
export class ComponentsModule { }
