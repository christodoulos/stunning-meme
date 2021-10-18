import { Injectable } from '@angular/core';
import { Query, Store, StoreConfig } from '@datorama/akita';
import { Filename, Icon } from '@nocode/ui';

export interface BasicCodeEditor {
  filename: Filename;
  action: string;
  changed: boolean;
  saved: boolean;
  script: Array<string>;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'basic-code-editor' })
export class BasicCodeEditorStore extends Store<BasicCodeEditor> {
  constructor() {
    super({});
  }
}

@Injectable({ providedIn: 'root' })
export class BasicCodeEditorService {
  constructor(private store: BasicCodeEditorStore) {}

  updateFilename(filename: Partial<BasicCodeEditor>) {
    this.store.update({ ...filename });
  }

  updateAction(action: Partial<BasicCodeEditor>) {
    this.store.update({ ...action });
  }

  updateChanged(changed: Partial<BasicCodeEditor>) {
    this.store.update({ ...changed, saved: false });
  }

  clearAction() {
    this.store.update({ script: [], action: 'none', changed: false });
  }

  updateScript(script: Partial<BasicCodeEditor>) {
    this.store.update({ ...script, action: 'none', saved: true });
  }
}

@Injectable({ providedIn: 'root' })
export class BasicCodeEditorQuery extends Query<BasicCodeEditor> {
  filename$ = this.select((state) => state.filename.name);
  action$ = this.select((state) => state.action);
  constructor(protected store: BasicCodeEditorStore) {
    super(store);
  }
}
