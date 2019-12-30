import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor() { }


  // @ViewChild('#btnArrow', {static: false}) btnArrow : <ElementRef>
  ngOnInit() {
  }

}
