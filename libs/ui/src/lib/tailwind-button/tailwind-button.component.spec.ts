import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindButtonComponent } from './tailwind-button.component';

describe('TailwindButtonComponent', () => {
  let component: TailwindButtonComponent;
  let fixture: ComponentFixture<TailwindButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailwindButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailwindButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
