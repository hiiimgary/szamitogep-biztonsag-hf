import { trigger, transition, style, query, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  animations: [
    trigger('expand', [
      transition(':enter', [
        style({ height: 0, marginTop: 0 }),
        query('.error', style({ opacity: 0 })),
        animate('300ms ease-in-out', style({ height: '*', marginTop: '*' })),
        query('.error', animate(100, style({ opacity: 1 })))
      ]),
      transition(':leave', [
        style({ height: '*', marginTop: '*' }),
        query('.error', style({ opacity: 1 })),
        query('.error', animate(100, style({ opacity: 0 }))),
        animate('300ms ease-in-out', style({ height: 0, marginTop: 0 }))
      ]),
    ]),
  ]
})
export class InputFieldComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() controlKey: string;
  @Input() type = 'text';
  @Input() inputType = 'text';
  @Input() label: string;
  @Input() requiredError: string;
  @Input() patternError: string;

  imgString: string;

  constructor() { }

  ngOnInit(): void {
  }

  get control(): FormControl {
    return this.form.get(this.controlKey) as FormControl;
  }

  hasPatternError() {
    return this.control.hasError('pattern') && this.patternError;
  }

  hasRequiredError() {
    return this.control.hasError('required') && this.requiredError;
  }

  fileSelected(fileList) {
    if (fileList && fileList.length === 1) {
      const file = fileList[0];
      this.form.get(this.controlKey).setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          this.imgString = reader.result as string;
        };
      };
    }
  }

  deleteImage() {
    this.imgString = null;
    this.form.get(this.controlKey).reset();
  }
}
