import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarCircularComponent } from './avatar-circular.component';

describe('AvatarCircularComponent', () => {
  let component: AvatarCircularComponent;
  let fixture: ComponentFixture<AvatarCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarCircularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
