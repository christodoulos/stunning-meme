import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeToolbarComponent } from './code-toolbar.component';

describe('CodeToolbarComponent', () => {
  let component: CodeToolbarComponent;
  let fixture: ComponentFixture<CodeToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
