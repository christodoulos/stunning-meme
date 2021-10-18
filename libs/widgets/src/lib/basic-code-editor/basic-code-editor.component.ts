import { Component, OnInit } from '@angular/core';
import { Icon, Filename } from '@nocode/ui';
import { BasicCodeEditorQuery, BasicCodeEditorService } from '../widgets.state';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'basic-code-editor',
  templateUrl: './basic-code-editor.component.html',
  styleUrls: ['./basic-code-editor.component.css'],
})
export class BasicCodeEditorComponent implements OnInit {
  filename: Filename = { name: '', ext: '', attn: false };
  toolbar = new Map<string, Icon>();

  action$ = this.query.action$;

  constructor(
    private service: BasicCodeEditorService,
    private query: BasicCodeEditorQuery
  ) {}

  ngOnInit(): void {
    this.toolbarInit();
  }

  toolbarInit(): void {
    this.toolbar.set('new', { name: 'document', order: 0 });
    this.toolbar.set('save', { name: 'download', order: 1 });
    this.toolbar.set('load', { name: 'upload', order: 2 });
    this.toolbar.set('run', { name: 'play', order: 3 });
  }

  onFilename(filename: Filename) {
    this.service.updateFilename({ filename: filename });
  }

  onAction(action: string) {
    this.service.updateAction({ action: action });
  }

  onCleared() {
    setTimeout(() => this.service.clearAction());
  }

  onChanged() {
    this.service.updateChanged({ changed: true });
  }

  onScript(script: Array<string>) {
    setTimeout(() =>
      this.service.updateScript({ script: script, changed: false })
    );
  }
}
