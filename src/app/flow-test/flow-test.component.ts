import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flow-test',
  standalone: true,
  imports: [NgClass],
  templateUrl: './flow-test.component.html',
  styleUrl: './flow-test.component.css'
})
export class FlowTestComponent {

  container_class: string = 'container-4';

  items4 = [
    { content: 'Element full', span: 'full' },

    { content: 'Element quarter', span: 'quarter' },
    { content: 'Element half', span: 'half' },
    { content: 'Element quarter', span: 'quarter' },

    { content: 'Element three-quarters', span: 'three-quarters' },
    { content: 'Element quarter', span: 'quarter' },

    { content: 'Element half', span: 'half' },
    { content: 'Element half', span: 'half' },

    { content: 'Element quarter', span: 'quarter' },
    { content: 'Element quarter', span: 'quarter' },
    { content: 'Element quarter', span: 'quarter' },
    { content: 'Element quarter', span: 'quarter' },


    { content: 'Element quarter', span: 'quarter' },
    { content: 'Element three-quarters', span: 'three-quarters' },

    { content: 'Element full', span: 'full' },
  ];

  items3 = [
    { content: 'Element full', span: 'full' },

    { content: 'Element third', span: 'third' },
    { content: 'Element third', span: 'third' },
    { content: 'Element third', span: 'third' },

    { content: 'Element two-thirds', span: 'two-thirds' },
    { content: 'Element third', span: 'third' },

    { content: 'Element third', span: 'third' },
    { content: 'Element two-thirds', span: 'two-thirds' },

    { content: 'Element half', span: 'half' },
    { content: 'Element half', span: 'half' },

    { content: 'Element full', span: 'full' },

  ];


  items2 = [
    { content: 'Element half', span: 'half' },
    { content: 'Element half', span: 'half' },

    { content: 'Element full', span: 'full' },

    { content: 'Element half', span: 'half' },
    { content: 'Element half', span: 'half' },

  ]


  setCol(id: number) {
    this.container_class = 'container-' + id;
  }
}
