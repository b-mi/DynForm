import { Component, inject } from '@angular/core';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayContentComponent } from '../overlay-content/overlay-content.component';

@Component({
  selector: 'app-overlay-test',
  standalone: true,
  imports: [OverlayModule, OverlayContentComponent],
  templateUrl: './overlay-test.component.html',
  styleUrl: './overlay-test.component.css'
})
export class OverlayTestComponent {

  private overlay = inject(Overlay);

  doIt($event: MouseEvent) {
    const overlayRef = this.overlay.create({
      height: '400px',
      width: '600px',
    });

    const config = new OverlayConfig({
      hasBackdrop: true
  });

    const userProfilePortal = new ComponentPortal(OverlayContentComponent);
    overlayRef.attach(userProfilePortal);
  }

}
