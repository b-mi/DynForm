import { JsonPipe, NgClass } from '@angular/common';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OverlayModule } from '@angular/cdk/overlay';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormFlowControlEditorComponent } from '../form-flow-control-editor/form-flow-control-editor.component';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { lastValueFrom } from 'rxjs';
import { FormFlowService } from './form-flow.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-form-flow-content',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, NgClass, MatButtonModule, MatIconModule, MatSlideToggleModule,
    MatCardModule, MatDatepickerModule, MatChipsModule, MatButtonToggleModule,
    MatTooltipModule, JsonPipe, MatSnackBarModule, MatRadioModule,
    FormFlowControlEditorComponent, FormsModule, OverlayModule, MatDividerModule],
  templateUrl: './form-flow-content.component.html',
  styleUrl: './form-flow-content.component.css'
})
export class FormFlowContentComponent {
  

  private http = inject(HttpClient);
  private snack = inject(MatSnackBar);

  clipboard = inject(Clipboard);

  protected config = inject(ConfigService);

  private fservice = inject(FormFlowService);

  private _editMode: boolean = false;

  @Input()
  public get editMode(): boolean {
    return this._editMode;
  }
  public set editMode(v: boolean) {
    this._editMode = v;
  }

  isEditOpen = false;


  appearance : MatFormFieldAppearance = 'fill'; // fill, outline

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



  private _formId!: string;
  @Input()
  public get formId(): string {
    return this._formId;
  }

  public set formId(v: string) {
    this._formId = v;
  }



  editedControl: any = null;


  editCtrl(ctl: any) {
    if (!this.isEditOpen) {
      console.log('edit', ctl);
      this.editedControl = ctl;
      this.isEditOpen = true;
    }
  }

  move(ctl: any, cmd: string) {

    const idx = this.controls.indexOf(ctl);
    console.log('move', cmd, idx);


    switch (cmd) {
      case 'left':
        if (idx > 0) {
          this.moveItem(this.controls, idx, idx - 1);
        }
        break;
      case 'smaller':
        this.changeSize(ctl, -1);
        break;
      case 'bigger':
        this.changeSize(ctl, 1);
        break;
      case 'right':
        if (idx < this.controls.length - 1) {
          this.moveItem(this.controls, idx, idx + 1);
        }
        break;

    }
  }
  changeSize(ctl: any, par: number) {

    const sizes: string[] = [
      'quarter',
      'third',
      'half',
      'two-thirds',
      'three-quarters',
      'full'
    ];

    const idx = sizes.indexOf(ctl.flex);
    if (par === -1) {
      //smaller
      if (idx > 0) {
        ctl.flex = sizes[idx - 1];
      }
    } else {
      // bigger
      if (idx < sizes.length - 1) {
        ctl.flex = sizes[idx + 1];
      }

    }

  }

  moveItem(data: any[], from: number, to: number) {
    // remove `from` item and store it
    var f = data.splice(from, 1)[0];
    // insert stored item into position `to`
    data.splice(to, 0, f);
  }

  closeEditOverlay(event: any) {
    console.log('close edit', event);
    this.isEditOpen = false;
    if (event.doSave) {
      const idx = this.controls.findIndex((i) => i.name === event.data.name);
      console.log('idx', idx);
      this.controls[idx] = event.data;
      this.editedControl = undefined;

    }
  }

  copyToClipboard() {
    this.clipboard.copy(JSON.stringify(this.controls, null, 4));
    this.snack.open('Copied into clipboard', 'OK');
  }

  async saveToFile() {
    await this.fservice.saveToFile(this.formId, this.controls);
  }

  cancelEdit() {
    this.editMode = false;
  }



}
