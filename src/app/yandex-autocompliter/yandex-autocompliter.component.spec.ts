import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexAutocompliterComponent } from './yandex-autocompliter.component';

describe('YandexAutocompliterComponent', () => {
  let component: YandexAutocompliterComponent;
  let fixture: ComponentFixture<YandexAutocompliterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YandexAutocompliterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YandexAutocompliterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
