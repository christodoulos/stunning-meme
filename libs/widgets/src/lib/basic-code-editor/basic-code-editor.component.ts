import { Component, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'basic-code-editor',
  templateUrl: './basic-code-editor.component.html',
  styleUrls: ['./basic-code-editor.component.css'],
})
export class BasicCodeEditorComponent implements OnInit {
  scriptName = '';
  script: Array<string> = [];
  scriptIsChanged = false;

  scriptIsSaved = true;
  saveScript = false;
  newScript = false;

  constructor() {
    console.log();
  }

  ngOnInit(): void {
    console.log();
  }

  onAction(action: string) {
    switch (action) {
      case 'document': // Click on New Document
        this.newScript = true;
        break;
      case 'download': // Click on Save Document
        this.saveScript = true;

        break;

      default:
        break;
    }
  }

  onFilename(filename: string) {
    this.scriptName = filename;
  }

  onScriptChanged() {
    this.scriptIsSaved = false;
    this.newScript = false;
  }

  onScript(script: Array<string>) {
    this.script = script;
    console.log(this.script);
    this.saveScript = false;
    this.scriptIsSaved = true;
  }
}
