import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataPickerComponent } from './components/data-picker/data-picker.component';
import { StarsRatingComponent } from './components/stars-rating/stars-rating.component';


const routes: Routes = [
  {
    path: 'datapicker', component: DataPickerComponent
  },
  {
    path: 'starsrating', component: StarsRatingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
