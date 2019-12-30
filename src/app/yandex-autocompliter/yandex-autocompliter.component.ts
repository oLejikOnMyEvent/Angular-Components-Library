import { map, ignoreElements } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, forwardRef, ViewChild, ElementRef, ViewChildren, Input, Output } from '@angular/core';
import { YandexAutocompliterService } from '../yandex-autocompliter.service'
// import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
// import { ENTER } from '@angular/cdk/keycodes';

interface Airports {
  city: string;
  code: string;
  countryOfAirport: string;
  name: string;

}


@Component({
  selector: 'app-yandex-autocompliter',
  templateUrl: './yandex-autocompliter.component.html',
  styleUrls: ['./yandex-autocompliter.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YandexAutocompliterComponent),
    multi: true
  }]
})

export class YandexAutocompliterComponent implements OnInit, ControlValueAccessor {

  constructor(private fb: FormBuilder, private YandexAutocompliterService: YandexAutocompliterService) {


  }

  @ViewChild('input', { static: false }) inputRef: ElementRef;
  @ViewChildren('listOfAirpotrs') listOfAirpotrsRef: ElementRef;
  @ViewChild('inputTest', { static: false }) inputTestRef: ElementRef;
 

  isShowCountry = false;

  isShowAutocomplite = false;


  findedCountries = {};


  value: Airports;

  airportCountry: string;




  cityOfAirport: string;
  countryOfAirport : string;
  nameOfAirport: string;
  codeOfAirport : string;



  @Input() choisedAirport: Airports;

  ngOnInit() {

  }

  fockusOut() {
    this.isShowCountry = false;
  }

  ShowCountry(event) {
    const value = event.target.value.split(',')[0];
    if (event) {
      if (event.target.value !== '') {
        let inputValue = event.target.value
        inputValue = inputValue.split('');
        inputValue.splice(0, 1, event.target.value[0].toUpperCase());
        this.inputRef.nativeElement.value = inputValue.join('');
      }
    };
    if (event.inputType === 'deleteContentBackward') {
      this.isShowData = false;
      if (event.target.value.length === 0 || value.length < 2) {
        this.isShowAutocomplite = false;
        this.isShowCountry = false;
        return false;
      } else if (this.filtredCountries10 === []
      ) {
        this.isShowAutocomplite = false;
        return false;
      } else {
        this.searchCountry(value);
      }
    } else {
      if (value.length >= 2 && value !== "") {
        this.isShowCountry = true;
        this.searchCountry(value);
      } else if (value.length < 2) {
        this.isShowCountry = false;
      }
    }
  }

  clickOnInput(event) {

  }


  selectedIndexAirpotr = 0;
  selectItem: any;
  onKey(event) {
    // console.log(this.listOfAirpotrsRef['_results'][ this.selectedIndexAirpotr]['nativeElement'].classList);

    // for(let i=0; i<this.listOfAirpotrsRef['_results'].length; i++){
    //   this.listOfAirpotrsRef['_results'][i]['nativeElement'].classList.remove("hover"); 
    // }

    if (this.inputRef.nativeElement.value.length !== 0) {
      this.isShowCountry = true;
    }
    if (event.code === "ArrowDown") {
      if (this.selectedIndexAirpotr <= this.filtredCountries10.length - 2) {
        this.selectedIndexAirpotr++
        this.selectItem = this.filtredCountries10[this.selectedIndexAirpotr];
        this.clickOnCountry(this.selectItem.city, this.selectItem.name, this.selectItem.code, this.selectItem.country);
      } else {
        this.selectedIndexAirpotr = 0;
        this.selectItem = this.filtredCountries10[this.selectedIndexAirpotr]
        this.clickOnCountry(this.selectItem.city, this.selectItem.name, this.selectItem.code, this.selectItem.country);
      }
    } else if (event.code === "ArrowUp") {
      this.selectedIndexAirpotr--
      if (this.selectedIndexAirpotr >= 0) {

        this.selectItem = this.filtredCountries10[this.selectedIndexAirpotr]
        this.clickOnCountry(this.selectItem.city, this.selectItem.name, this.selectItem.code, this.selectItem.country);
      } else {
        this.selectedIndexAirpotr = this.filtredCountries10.length - 1;
        this.selectItem = this.filtredCountries10[this.selectedIndexAirpotr]
      }
    } else if (event.code === 'Enter' && this.selectedIndexAirpotr === 0) {
      this.clickOnCountry(this.filtredCountries10[0].city, this.filtredCountries10[0].name, this.filtredCountries10[0].code, this.filtredCountries10[0].country, 'input');
    } else if (event.code === 'Enter' && this.selectedIndexAirpotr !== 0) {
      // console.log(this.selectItem.city, this.selectItem.name , this.selectItem.code);

      this.clickOnCountry(this.selectItem.city, this.selectItem.name, this.selectItem.code, this.filtredCountries10[0].country, 'input');
    }
    // event.target.selectionStart = 30;
    //     event.target.selectionStart = 30;
    event.stopPropagation();
  }




  focusOut() {
    this.isShowCountry = false;
  }

  deleteClass() {
    // setTimeout(() => {
    //   for (let i = 0; i <= this.listOfAirpotrsRef['_results'].length; i++) {
    //     this.listOfAirpotrsRef['_results'][i]['nativeElement'].className = "Countries"
    //   }
    // }, 0);

  }



  searchCountry(value) {


    if (value) {
      this.searchCity(value)
    } else return false;

  }

  filtredCountries10 = [];
  searchCity(value: string) {
    this.selectedIndexAirpotr = 0;
    this.YandexAutocompliterService.searchAirport(value)
      .subscribe(
        (res) => {
          this.findedCountries = res;
          this.filtredCountries10 = [];
          for (let i = 0; i <= 8; i++) {
            if (this.findedCountries[i]) {
              this.filtredCountries10.push(this.findedCountries[i]);

              let isStart = this.findedCountries[0].city.startsWith(value);
              if (isStart) {
                this.cityOfAirport = this.findedCountries[0].city
              } else {
                this.selectedIndexAirpotr = 1;
                this.cityOfAirport = this.findedCountries[1].city
              }
            }
          }
          console.log(this.filtredCountries10);
          this.showAutoinput(this.filtredCountries10);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  whatIsCity(value, event) {
    this.selectedIndexAirpotr = value;
    // this.selectItem = this.filtredCountries10[this.selectedIndexAirpotr];
  }

  showAutoinput(value) {
    if (value.length === 0 || this.inputRef.nativeElement.value.length === 0) {
      this.isShowAutocomplite = false;
    } else this.isShowAutocomplite = true;
  }


  isShowData = false
  clickOnCountry(value, value1, value2, value3, input?) {

    let valueAirport = [];
    valueAirport = value1.split('');
    if (input) {
      this.isShowCountry = false
    }

    console.log(value, value1, value2, value3);
    
    //  if(value.length + value1.length > 45){
    //     valueAirport = valueAirport.splice(0,20);
    //     valueAirport.push('...')
    //     let valueAirportJoin =  valueAirport.join('');
    //     this.countryOfAirport = `,${valueAirportJoin}`;
    //   } else {

    if (value != "") {
      this.nameOfAirport = `,${value1}`;
      this.cityOfAirport = value;
      this.codeOfAirport = value2;
      this.isShowData = true;
      this.inputRef.nativeElement.value = `${value}`;
      this.countryOfAirport = value3;
    } else {
      this.nameOfAirport = `,${value1}`;
      this.cityOfAirport = value1;
      this.codeOfAirport = value2;
      this.isShowData = true;
      this.inputRef.nativeElement.value = `${value1}`;
      this.countryOfAirport = value3;
    }


    this.choisedAirport = {
      city: this.cityOfAirport,
      code: this.codeOfAirport,
      countryOfAirport: this.countryOfAirport,
      name: this.nameOfAirport,
    
    }
    this.writeValue(this.choisedAirport);
    this.onChange(this.choisedAirport)

  }

  clearForm() {
    this.inputRef.nativeElement.value = ''
    this.isShowCountry = false;
    this.isShowAutocomplite = false;
    this.isShowData = false;
  }

  onChange = (vlaue: any) => { };

  onTouched = () => { };


  connectValue() {
  }
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}