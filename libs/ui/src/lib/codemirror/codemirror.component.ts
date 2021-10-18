import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { ViewUpdate } from '@codemirror/view';
import { DialogService } from '@ngneat/dialog';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'codemirror',
  templateUrl: './codemirror.component.html',
  styleUrls: ['./codemirror.component.css'],
})
export class CodemirrorComponent implements AfterViewInit, OnChanges {
  @ViewChild('codemirror') editorElmRef!: ElementRef;
  @Input() language!: string;
  @Input() new = false;
  @Input() save = false;
  @Output() changed: EventEmitter<boolean> = new EventEmitter();
  @Output() cleared: EventEmitter<boolean> = new EventEmitter();
  @Output() script: EventEmitter<Array<string>> = new EventEmitter();

  editorDiv!: HTMLDivElement;
  editorView!: EditorView;

  viewInited = false;
  isChanged = false;
  isSaved = false;
  changeEmitted = false;

  constructor(private dialog: DialogService) {}

  ngAfterViewInit(): void {
    this.editorDiv = this.editorElmRef.nativeElement;
    this.editorView = new EditorView({
      state: EditorState.create({
        extensions: [
          basicSetup,
          this.setLanguage(),
          EditorView.updateListener.of((v: ViewUpdate) => {
            if (v.docChanged) {
              this.isChanged = true;
              this.isSaved = false;
              if (!this.changeEmitted) {
                this.changed.emit(true);
                this.changeEmitted = true;
              }
            }
          }),
        ],
      }),
      parent: this.editorDiv,
    });
    this.viewInited = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.viewInited)
      for (const prop in changes) {
        const change = changes[prop];
        switch (prop) {
          case 'new':
            if (change.currentValue) {
              this.newDocument();
              this.cleared.emit();
            }
            break;
          case 'save':
            if (change.currentValue) {
              this.isChanged = false;
              this.isSaved = true;
              this.script.emit(this.editorView.state.doc.toJSON());
              this.changeEmitted = false;
            }
            break;
          default:
            break;
        }
      }
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
    if (this.isChanged)
      this.dialog
        .confirm({
          title: 'Are you sure?',
          body: 'There are unsaved changes and the action cannot be undone!',
        })
        .afterClosed$.subscribe((confirmed: boolean) => {
          if (confirmed)
            this.editorView.dispatch({
              changes: { from: 0, to: this.editorView.state.doc.length },
            });
        });
  }
}
