import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { ViewUpdate } from '@codemirror/view';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'codemirror',
  templateUrl: './codemirror.component.html',
  styleUrls: ['./codemirror.component.css'],
})
export class CodemirrorComponent implements AfterViewInit {
  @ViewChild('codemirror') editorElmRef!: ElementRef;
  @Input() language!: string;
  @Input() set new(clickOnNew: boolean) {
    // Why do we need this? Try to understand Angular Change Detection ...
    setTimeout(() => {
      if (this.editorView && clickOnNew) {
        console.log('Click on New Document');
        this.newDocument();
      }
    });
  }
  @Input() set save(clickOnSave: boolean) {
    // Why do we need this? Try to understand Angular Change Detection ...
    setTimeout(() => {
      if (this.editorView && clickOnSave) {
        console.log('Click on Save Document');
        this.script.emit(this.editorView.state.doc.toJSON());
      }
    });
  }
  @Output() script: EventEmitter<Array<string>> = new EventEmitter<
    Array<string>
  >();
  @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();
  editorDiv!: HTMLDivElement;
  editorView!: EditorView;

  ngAfterViewInit(): void {
    this.editorDiv = this.editorElmRef.nativeElement;
    this.editorView = new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          this.setLanguage(),
          EditorView.updateListener.of((v: ViewUpdate) => {
            if (v.docChanged) {
              this.changed.emit(true);
            }
          }),
        ],
      }),
      parent: this.editorDiv,
    });
  }

  setLanguage() {
    switch (this.language) {
      case 'python':
        return python();
      case 'javascript':
        return javascript();
      default:
        return python();
    }
  }

  newDocument() {
    this.editorView.dispatch({
      changes: { from: 0, to: this.editorView.state.doc.length },
    });
  }
}
