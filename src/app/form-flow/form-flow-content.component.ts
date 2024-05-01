import { NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormFlowControlEditorComponent } from '../form-flow-control-editor/form-flow-control-editor.component';
import { FormFlowService } from './form-flow.service';

@Component({
  selector: 'app-form-flow-content',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, NgClass, MatButtonModule, MatIconModule, MatSlideToggleModule,
    MatCardModule, MatDatepickerModule, MatChipsModule, MatButtonToggleModule,
    FormFlowControlEditorComponent, FormsModule],
  templateUrl: './form-flow-content.component.html',
  styleUrl: './form-flow-content.component.css'
})
export class FormFlowContentComponent {

  private fservice = inject(FormFlowService);

  private _editMode: boolean = false;

  @Input()
  public get editMode(): boolean {
    return this._editMode;
  }
  public set editMode(v: boolean) {
    this._editMode = v;
  }



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

  editedControl: any = null;


  editCtrl(ctl: any) {
    console.log('edit', ctl);
    this.editedControl = ctl;
  }


}
