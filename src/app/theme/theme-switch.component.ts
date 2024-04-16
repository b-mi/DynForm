import { Component, Input, inject } from '@angular/core';
import { ThemeService } from './theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.css'
})
export class ThemeSwitchComponent {


private _label : string = 'Light';
public get label() : string {
  return this._label;
}
@Input()
public set label(v : string) {
  this._label = v;
}


  changeTheme() {
    this.themeService.updateTheme();
  }
  themeService: ThemeService = inject(ThemeService);
}
