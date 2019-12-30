import { TestBed } from '@angular/core/testing';

import { YandexAutocompliterService } from './yandex-autocompliter.service';

describe('YandexAutocompliterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YandexAutocompliterService = TestBed.get(YandexAutocompliterService);
    expect(service).toBeTruthy();
  });
});
