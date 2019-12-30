import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { YandexAutocompliterService } from './yandex-autocompliter.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'UiComponentsLib';


  form : FormGroup;
  airportControl : any;


  startSlider: any;
  endSlider: any;
  step: any;
  
  sliderControl: any;
  constructor(private fb: FormBuilder, private YandexAutocompliterService: YandexAutocompliterService ){

    this.form = fb.group({});

    this.airportControl = fb.control({});

    this.startSlider = fb.control(1);
    this.endSlider = fb.control(100);
    this.step = fb.control(10);

    this.sliderControl = fb.control({});
   


  }

}
