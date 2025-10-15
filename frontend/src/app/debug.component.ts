import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; border: 2px solid red; margin: 20px;">
      <h2>Debug Component</h2>
      <p>If you can see this, the component rendering is working!</p>
      <p>Time: {{ currentTime }}</p>
    </div>
  `
})
export class DebugComponent {
  currentTime = new Date().toLocaleTimeString();
}