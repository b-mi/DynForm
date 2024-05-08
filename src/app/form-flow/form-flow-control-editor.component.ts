import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFlowService } from './form-flow.service';
import { FormFlowContentComponent } from './form-flow-content.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-form-flow-control-editor',
  standalone: true,
  imports: [JsonPipe, MatButtonModule, forwardRef(() => FormFlowContentComponent), 
    MatToolbarModule],
  templateUrl: './form-flow-control-editor.component.html',
  styleUrl: './form-flow-control-editor.component.css'
})
export class FormFlowControlEditorComponent implements OnInit {

  private fservice = inject(FormFlowService);

  private _controlData: any;
  @Input()
  public get controlData(): any {
    return this._controlData;
  }
  public set controlData(v: any) {
    if (!this._controlData && v) {
      this.formGroup = this.fservice.createFormGroup(this.edControls);
      this._controlData = v;
      this.fservice.setControlData(this.formGroup, this.edControls, v);

    }
  }

  formGroup!: FormGroup;

  @Output() onClose = new EventEmitter<any>();


  edControls = [

    {
      "type": "text",
      "label": "name",
      "name": "name",
      "flex": 'third',
      "value": "",
      isRequired: true,
    },
    {
      "type": "text",
      "label": "label",
      "name": "label",
      "flex": 'third',
      "value": "",
      isRequired: true,
    },
    {
      "type": "select",
      "label": "type",
      "name": "type",
      "flex": 'third',
      "values": [
        { label: 'text', key: 'text' },
        { label: 'textarea', key: 'textarea' },
        { label: 'select', key: 'select' },
        { label: 'checkbox', key: 'checkbox' },
        { label: 'number', key: 'number' },
        { label: 'date', key: 'date' },
        { label: 'space', key: 'space' },

      ],
    },
    {
      "type": "select",
      "label": "flex",
      "name": "flex",
      "flex": 'third',
      "values": [
        { label: '100%', key: 'full' },
        { label: '75%', key: 'three-quarters' },
        { label: '66%', key: 'two-thirds' },
        { label: '50%', key: 'half' },
        { label: '33%', key: 'third' },
        { label: '25%', key: 'quarter' },
      ],
    },
    {
      "type": "checkbox",
      "label": "isRequired",
      "name": "isRequired",
      "flex": 'third',
      "value": null,
    },
    {
      "type": "text",
      "label": "value",
      "name": "value",
      "flex": 'third',
      "value": null,
    },

    {
      "type": "number",
      "label": "minLength",
      "name": "minLength",
      "flex": 'third',
      "value": null,
    },
    {
      "type": "number",
      "label": "maxLength",
      "name": "maxLength",
      "flex": 'third',
      "value": null,
    },
    {
      "type": "number",
      "label": "min",
      "name": "min",
      "flex": 'third',
      "value": null,
    },
    {
      "type": "number",
      "label": "max",
      "name": "max",
      "flex": 'third',
      "value": null,
    },
    {
     type: "space",
     name: "",
     "flex": 'two-thirds',

    },
    {
      "type": "text",
      "label": "hintStart",
      "name": "hintStart",
      "flex": 'half',
      "value": null,
    },
    {
      "type": "text",
      "label": "hintEnd",
      "name": "hintEnd",
      "flex": 'half',
      "value": null,
    },
  ]

  constructor() {


  }
  ngOnInit() {
  }

  save(doSave: boolean) {

    for (let ec of this.edControls) {

      if( ec.type === 'space' )
        continue;

      const val = this.formGroup.get(ec.name)?.value;
      if (!val && !this._controlData[ec.name]) continue; // if both are null - no change 
      if (val === this._controlData[ec.name]) continue; // if both are equal - no change 

      this._controlData[ec.name] = val;


    }

    this.onClose.next({ doSave: doSave, data: this._controlData });
  }

}
