import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDirective } from './directives/admin.directive';



@NgModule({
  declarations: [
    InputFieldComponent,
    AdminDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    AdminDirective
  ]
})
export class SharedModule { }
