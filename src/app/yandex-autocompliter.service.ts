import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YandexAutocompliterService {

  constructor(private http: HttpClient) {
  }

  adress = '/airports?term=';


  showAllAirports() {
    return this.http.get(this.adress);
  }

  searchAirport(value) {
    return this.http.get(`/airports?term=${value}`)
    
  //   .pipe(
  // map(item => );    )
  }
}
