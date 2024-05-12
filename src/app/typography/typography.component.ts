import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [NgClass],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.css'
})
export class TypographyComponent {

  list = [


    "mat-headline-1",
    "headline-1",
    "headline-2",
    "mat-headline-2",
    "mat-headline-3",
    "mat-headline-4",
    "mat-h1",
    "mat-headline-5",
    "mat-h2",
    "mat-headline-6",
    "mat-h3",
    "mat-subtitle-1",
    "mat-h4",
    "mat-body-1",
    "mat-h5",
    "mat-h6",
    "mat-body",
    "mat-body-2",
    "mat-body-strong",
    "mat-subtitle-2",
    "mat-small",
    "mat-caption",



  ]


}
