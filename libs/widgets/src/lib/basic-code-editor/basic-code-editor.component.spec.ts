import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCodeEditorComponent } from './basic-code-editor.component';

describe('BasicCodeEditorComponent', () => {
  let component: BasicCodeEditorComponent;
  let fixture: ComponentFixture<BasicCodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicCodeEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
