import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFlowService } from '../form-flow/form-flow.service';
import { FormFlowContentComponent } from '../form-flow/form-flow-content.component';
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
      console.log('set controlData', this._controlData);

    }
  }

  formGroup!: FormGroup;

  @Output() onClose = new EventEmitter<any>();


  edControls = [

    {
      "type": "text",
      "label": "name",
      "name": "name",
      "flex": 'half',
      "value": "",
      isRequired: true,
    },
    {
      "type": "text",
      "label": "label",
      "name": "label",
      "flex": 'half',
      "value": "",
      isRequired: true,
    },
    {
      "type": "select",
      "label": "type",
      "name": "type",
      "flex": 'half',
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
      "flex": 'half',
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
      "flex": 'half',
      "value": null,
    },
    {
      "type": "text",
      "label": "value",
      "name": "value",
      "flex": 'half',
      "value": null,
    },

    {
      "type": "number",
      "label": "minLength",
      "name": "minLength",
      "flex": 'half',
      "value": null,
    },
    {
      "type": "number",
      "label": "maxLength",
      "name": "maxLength",
      "flex": 'half',
      "value": null,
    },
    {
      "type": "number",
      "label": "min",
      "name": "min",
      "flex": 'half',
      "value": null,
    },
    {
      "type": "number",
      "label": "max",
      "name": "max",
      "flex": 'half',
      "value": null,
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

    console.log('save 1', this._controlData);


    for (let ec of this.edControls) {

      const val = this.formGroup.get(ec.name)?.value;
      if (!val && !this._controlData[ec.name]) continue; // if both are null - no change 
      if (val === this._controlData[ec.name]) continue; // if both are equal - no change 

      console.log('changed', ec.name, val, this._controlData[ec.name]);
      this._controlData[ec.name] = val;


    }

    // console.log('save 2', JSON.stringify(this._controlData, null, 4));


    this.onClose.next({ doSave: doSave, data: this._controlData });
  }

}
