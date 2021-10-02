import { Component } from '@angular/core';

@Component({
  selector: 'nocode-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gnosys';
  filename = '';

  onAction(action: string) {
    console.log(action);
  }

  onFilename(filename: string) {
    this.filename = filename;
  }
}
