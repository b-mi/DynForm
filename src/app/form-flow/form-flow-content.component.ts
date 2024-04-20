import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-flow-content',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, NgClass, MatButtonModule, MatIconModule, MatSlideToggleModule,
    MatCardModule],
  templateUrl: './form-flow-content.component.html',
  styleUrl: './form-flow-content.component.css'
})
export class FormFlowContentComponent {


  //'fill' | 'outline'
  private _form!: FormGroup;
  public get formGroup(): FormGroup {
    return this._form;
  }
  @Input()
  public set formGroup(v: FormGroup) {
    this._form = v;

  }



  private _controls!: any[];
  public get controls(): any[] {
    return this._controls;
  }
  @Input()
  public set controls(v: any[]) {
    this._controls = v;

  }



}
