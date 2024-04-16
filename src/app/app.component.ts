import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormSampleComponent } from './form-sample/form-sample.component';
import { FlowTestComponent } from './flow-test/flow-test.component';
import { TypographyComponent } from './typography/typography.component';
import { ThemeSwitchComponent } from './theme/theme-switch.component';
import { ThemeService } from './theme/theme.service';
import { NgClass } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormSampleComponent, FlowTestComponent, TypographyComponent, 
    ThemeSwitchComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dyn-form';
  themeService: ThemeService = inject(ThemeService);
}
