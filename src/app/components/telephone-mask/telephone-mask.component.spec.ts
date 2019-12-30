import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneMaskComponent } from './telephone-mask.component';

describe('TelephoneMaskComponent', () => {
  let component: TelephoneMaskComponent;
  let fixture: ComponentFixture<TelephoneMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelephoneMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelephoneMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
