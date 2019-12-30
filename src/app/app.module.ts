import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ComponentsComponent } from './components/components.component';
import { HeaderComponent } from './header/header.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { DataPickerComponent } from './components/data-picker/data-picker.component';
import { StarsRatingComponent } from './components/stars-rating/stars-rating.component';
import { TelephoneMaskComponent } from './components/telephone-mask/telephone-mask.component';
import { YandexAutocompliterComponent } from './yandex-autocompliter/yandex-autocompliter.component';
import { HttpClientModule  } from '@angular/common/http';

import { NpnSliderModule } from "npn-slider";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './slider/slider.component';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ComponentsComponent,
    HeaderComponent,
    DocumentationComponent,
    DataPickerComponent,
    StarsRatingComponent,
    TelephoneMaskComponent,
    YandexAutocompliterComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NpnSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
