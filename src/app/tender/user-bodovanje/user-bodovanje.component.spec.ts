import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBodovanjeComponent } from './user-bodovanje.component';

describe('UserBodovanjeComponent', () => {
  let component: UserBodovanjeComponent;
  let fixture: ComponentFixture<UserBodovanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBodovanjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBodovanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
