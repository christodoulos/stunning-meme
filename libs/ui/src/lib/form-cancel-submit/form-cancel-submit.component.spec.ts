import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCancelSubmitComponent } from './form-cancel-submit.component';

describe('FormCancelSubmitComponent', () => {
  let component: FormCancelSubmitComponent;
  let fixture: ComponentFixture<FormCancelSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCancelSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCancelSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
