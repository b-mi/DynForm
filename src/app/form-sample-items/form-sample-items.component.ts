import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form-sample-items',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatListModule, ScrollingModule, NgClass],
  templateUrl: './form-sample-items.component.html',
  styleUrls: ['./form-sample-items.component.css']
})
export class FormSampleItemsComponent {
  selectedId!: number;
  editId!: number;

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

}
