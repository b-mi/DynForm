import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appSmoothHeight]',
  standalone: true,
})
export class SmoothHeightDirective {
  // @Input() appSmoothHeight: boolean = false;
  pulse?: boolean;
  startHeight?: number;


private _appSmoothHeight : boolean = false;
@Input()
public get appSmoothHeight() : boolean {
  return this._appSmoothHeight;
}
public set appSmoothHeight(v : boolean) {
  // setTimeout(() => {
    this._appSmoothHeight = v;
    
  // }, 2000);
}



  constructor(private element: ElementRef) { }

  @HostBinding('@grow')
  get grow() {
    console.log('grow', this.pulse, this.startHeight);

    return { value: this.pulse, params: { startHeight: this.startHeight } };
  }

  setStartHeight() {
    this.startHeight = this.element.nativeElement.clientHeight;
    console.log('sth', this.startHeight);

  }

  ngOnChanges(changes: SimpleChanges) {


    const prevVal = changes["previousValue"] ?? false;
    const newVal = changes["currentValue"] ?? false;
    const isFirstChg = changes["firstChange"];

    console.log('chg', changes, this.pulse, changes["previousValue"]);

    this.pulse = !this.pulse;
    // if (prevVal !== newVal || isFirstChg) {
    this.setStartHeight();
    // setTimeout(() => {
    // }

    // }, 2000);
  }
}


import { animate, style, transition, trigger } from "@angular/animations";

export const smoothHeight = trigger('grow', [
  transition('void <=> *', []),
  transition('* <=> *', [style({ height: '{{startHeight}}px', opacity: 1 }), 
    animate('0.4s ease')], {
    params: { startHeight: 0 }
  })
]);