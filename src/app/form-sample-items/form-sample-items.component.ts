import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { NgClass } from '@angular/common';
import { FormFlowContentComponent } from '../form-flow/form-flow-content.component';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FormGroup } from '@angular/forms';
import { FormFlowService } from '../form-flow/form-flow.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-form-sample-items',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatListModule, ScrollingModule, NgClass,
    FormFlowContentComponent, MatIconModule, MatButtonModule],
  templateUrl: './form-sample-items.component.html',
  styleUrls: ['./form-sample-items.component.css']
})
export class FormSampleItemsComponent implements OnInit {


  private fservice = inject(FormFlowService);

  selectedId?: number;
  editId?: number;
  formGroup!: FormGroup;

  allowEditMode = false;
  useOutline = false;
  appearance: MatFormFieldAppearance = 'fill'; // fill / outline
  formIdItemsSample: string = 'itemsSample';
  ctlsItemsSample: any[] = [];

  setSelected(id: number) {
    this.selectedId = id;
  }



  items = [
    { id: 1, name: 'name1', age: 34, date: '2024-12-24' },
  ]


  /**
   *
   */
  constructor() {
    // 100000
    for (let index = 2; index < 100000; index++) {
      this.items.push({ id: index, name: 'name' + index.toString(), age: index % 77, date: '2024-12-24' });
    }

  }


  ngOnInit() {
    this.loadForms();
  }


  async loadForms() {
    // load form definitions from json file in assets/ and configured assetsFormDir in config.json
    this.ctlsItemsSample = await this.fservice.loadFormDef(this.formIdItemsSample);

    // create empty fromGroup
    const fg = new FormGroup({});

    // fill formGroup
    this.fservice.appendToFormGroup(fg, this.ctlsItemsSample);
    this.formGroup = fg;

  }

  startEdit(id: number, data: any) {
    
    this.fservice.setFormData(this.formGroup, data, this.ctlsItemsSample);
    this.editId = id;
    this.selectedId = id;
  }

  cancelEdit(id: number, data: any) {
    this.editId = undefined;
  }
  saveEdit(id: number, data: any) {
    this.fservice.setDataFromForm(this.formGroup, data, this.ctlsItemsSample);
    this.editId = undefined;
  }

  deleteItem(id: number, data: any) {
    this.items = this.items.filter(itm => itm.id !== id);
    this.editId = undefined;
    this.selectedId = undefined;

  }


}
