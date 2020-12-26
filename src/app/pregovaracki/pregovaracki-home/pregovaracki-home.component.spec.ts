import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregovarackiHomeComponent } from './pregovaracki-home.component';

describe('PregovarackiHomeComponent', () => {
  let component: PregovarackiHomeComponent;
  let fixture: ComponentFixture<PregovarackiHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregovarackiHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregovarackiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
