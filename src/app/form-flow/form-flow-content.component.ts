import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { JsonPipe, NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
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
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OverlayModule } from '@angular/cdk/overlay';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormFlowControlEditorComponent } from './form-flow-control-editor.component';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable, debounceTime, distinctUntilChanged, lastValueFrom, map, of, startWith, switchMap, tap } from 'rxjs';
import { FormFlowService } from './form-flow.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-form-flow-content',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, NgClass, MatButtonModule, MatIconModule, MatSlideToggleModule,
    MatCardModule, MatDatepickerModule, MatChipsModule, MatButtonToggleModule, AsyncPipe,
    MatTooltipModule, JsonPipe, MatSnackBarModule, MatRadioModule, MatAutocompleteModule,
    FormFlowControlEditorComponent, FormsModule, OverlayModule, MatDividerModule,
    MatAutocompleteModule, AsyncPipe

  ],
  templateUrl: './form-flow-content.component.html',
  styleUrl: './form-flow-content.component.css'
})
export class FormFlowContentComponent implements OnInit {
  filteredOptions: { [key: string]: Observable<any> | undefined } = {};

  // private http = inject(HttpClient);
  // private snack = inject(MatSnackBar);


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


  appearance: MatFormFieldAppearance = 'fill'; // fill, outline

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


  ngOnInit() {
    console.log('init', this.controls);

    this.controls.forEach(ctl => {
      if (ctl.api) {
        console.log('set', ctl.name);

        this.filteredOptions[ctl.name] = this.formGroup.get(ctl.name)?.valueChanges.pipe(
          distinctUntilChanged(),
          debounceTime(1000),
          startWith(''),
          tap(value => console.log('tap', value)),

          switchMap(value => this.fservice.getApiValues(ctl.api, value ?? '-'))
        );
      }
    });

  }


  editCtrl(ctl: any) {
    if (!this.isEditOpen) {
      this.editedControl = ctl;
      this.isEditOpen = true;
    }
  }

  move(ctl: any, cmd: string) {

    const idx = this.controls.indexOf(ctl);

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
    this.isEditOpen = false;
    if (event.doSave) {
      const idx = this.controls.findIndex((i) => i.name === event.data.name);
      this.controls[idx] = event.data;
      this.editedControl = undefined;

    }
  }


  async saveToFile() {
    await this.fservice.saveToFile(this.formId, this.controls);
  }

  cancelEdit() {
    this.editMode = false;
  }

  displayFn(item: any): string {
    return item && item.label ? item.label : '';
  }



}
