import { startWith } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, forwardRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderComponent),
    multi: true,
  }],
})
export class SliderComponent implements OnInit, ControlValueAccessor {

  constructor() { }


  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    if(this.isClicked){
      this.mouseMove(e)
      
    } else if(this.isClickedTwo){
      this.mouseMouveSecond(e);
    }
    
  }
  @HostListener('document:mouseup', ['$event'])
  omMouseUp(e){
    this.isClickedTwo = false;
    this.isClicked = false;
  }


  @Input() start: any;
  
  @Input() end: any;

  @Input() step: any;
  

  @Input() sliderValue: any;


  @ViewChild('firstBox', { static: false }) firstBoxRef: ElementRef;

  @ViewChild('secondBox', { static: false }) secondBoxRef: ElementRef;

  @ViewChild('inputTest', { static: false }) inputTestRef: ElementRef;


  @ViewChild('slider', {static: false}) sliderRef: ElementRef;

  oninput;
  valueTest: number;

  isClicked = false;
  isClickedTwo = false;

  pixels = 0;

  fullStyle: string;
  fullStyleRight: string;

  // start = 0;
  endCount = 48;


  sliderModel = [0, 0, 0];
  sliderWidth = 100;

  value: any;


  clickOnBoxNum: 0;
  mouseMoveNum: 0;

  sizeOfSlider = this.sliderRef;


  ngOnInit() {
 
    
  }
  clickOnBox(event) {

    // console.log(this.firstBoxRef.nativeElement.getBoundingClientRect());

    // console.log(event.clientX, ' CLICK ON BOX');
    this.clickOnBoxNum = event.clientX;


    this.isClicked = true;
    this.isClickedTwo = false;

  }

  moveBox(event) {

  }

  isRight: number;
  isLeft: number;

  mouseMoveNumTwo : number;

  mouseMoveLeftOrRight(event) {
    event.preventDefault()
    this.mouseMoveNum = event.clientX;
    // this.mouseMove
  }

  mouseMoveLeftOrRightTwo(event){
    event.preventDefault()
    this.mouseMoveNumTwo = event.clientX;
  }

  isRight2: number;
  isLeft2: number;
  mouseMove(event) {
    event.preventDefault()
    
    // console.log(event.screenX);
    // console.log(event.x);
    // console.log(event.clientX);
    let move = this.firstBoxRef.nativeElement.getBoundingClientRect();

    this.isRight = move.right;
    this.isLeft = move.left;

    // console.log('right ::: ', this.isRight, 'left:::', this.isLeft);
    // if (this.isRight && this.isClicked === true ) {
    //   let moveX = Math.round(((event.clientX) - 320)/ this.sliderWidth*100);
    //   this.fullStyle = `${moveX}px`
    //   this.start.value++;
    // } 
    if (this.mouseMoveNum >= this.clickOnBoxNum && this.isClicked && this.isClickedTwo === false) {
      this.rightMouseMove(event);
    } else if (this.mouseMoveNum <= this.clickOnBoxNum && this.isClicked && this.isClickedTwo === false) { this.leftMouseMove(event) }
  }


  //   _currentValues;
  //   onSliderChange(selectedValues: number[]) {
  //     this._currentValues = selectedValues;
  // };


  mouseMoveTwo(event){

    let move2 = this.secondBoxRef.nativeElement.getBoundingClientRect();
    this.isRight2 = move2.right;
    this.isLeft2 = move2.left;

    
    if (this.mouseMoveNumTwo >= this.clickOnBoxNum && this.isClickedTwo && this.isClicked === false) {
      this.rightMouseMoveTwo(event);
    } else if (this.mouseMoveNumTwo<= this.clickOnBoxNum && this.isClickedTwo && this.isClicked === false) { this.leftMouseMoveTwo(event) }
  }


  rightMouseMove(event) {

    // console.log(this.sliderRef.nativeElement.offsetWidth);
    
    // let sizeOf = this.sliderRef.nativeElement.offsetWidth
    let moveX = Math.round(((event.clientX) - 325) / 1);
    this.fullStyle = `${moveX}px`;
    this.start.value+=this.step.value


    if(moveX >= this.sliderRef.nativeElement.offsetWidth-20 ){
  
      
      this.isClicked = false;
      this.start.value = 48
    }

    this.sliderValue = {
      leftValue: this.start.value,
      rightValue: this.end.value
    }
 
    this.writeValue(this.sliderValue);
    this.onChange(this.sliderValue)
  }

  leftMouseMove(event) {
    let moveX = Math.round(((event.clientX) - 320) / this.sliderWidth * 100);
  
    this.fullStyle = `${moveX}px`;
    if(moveX <=1){

      
      this.isClicked= false
      this.start.value = 1;
      this.fullStyle= `1px`;
    }

    this.start.value--;
    // if( this.start.value <= 1){
    //   this.isClicked= false
    //   this.start.value = 1;
    //   this.fullStyle= `1px`;
    // }

    this.sliderValue = {
      leftValue: this.start.value,
      rightValue: this.end.value
    }

    this.writeValue(this.sliderValue);
    this.onChange(this.sliderValue)
  }


  
  rightMouseMoveTwo(event) {
    
    
    let moveX = Math.round(((event.clientX) - 325) / this.sliderWidth * 100);

    this.fullStyleRight = `${moveX}px`;
  
    this.end.value+=this.step.value
  
    if(moveX >= this.sliderRef.nativeElement.offsetWidth-20 ){
      this.isClickedTwo= false;
      this.endCount = 48
    }

    this.sliderValue = {
      leftValue: this.start.value,
      rightValue: this.end.value
    }

  
    

    this.writeValue(this.sliderValue);
    this.onChange(this.sliderValue)
  }

  leftMouseMoveTwo(event) {
    let moveX = Math.round(((event.clientX) - 320) / this.sliderWidth * 100);
   this.fullStyleRight = `${moveX}px`;
   
    this.endCount--;
    if(moveX <=1 ){
      this.isClickedTwo= false;
      this.endCount = 1
    }

    this.sliderValue = {
      leftValue: this.start.value,
      rightValue: this.endCount
    }

    this.writeValue(this.sliderValue);
    this.onChange(this.sliderValue)
  }



  mouseMouveSecond(event) {
    let move = this.secondBoxRef.nativeElement.getBoundingClientRect();

    this.isRight = move.right;
    this.isLeft = move.left;
    // console.log('right ::: ', this.isRight, 'left:::', this.isLeft);


    if (this.isRight && this.isClickedTwo === true) {
      this.rightMouseMoveTwo(event);
    }
    else this.leftMouseMoveTwo(event)


  }

  

clickOnBox2(event){
  this.clickOnBoxNum = event.clientX;


  this.isClickedTwo = true;
  this.isClicked = false;
    
}

  mouseUp() {


  }


  // moveToPoint(event) {
  //   let moveX = Math.round(((event.clientX) - 320) / this.sliderWidth * 100);
  //   this.fullStyle = `${moveX}px`
  //   this.start.value = Math.round(moveX / 5);
  // }

  valueTest2: number;

  testMove(event) {
    // console.log(event.target.valueAsNumber);
    // console.log(this.inputTestRef.nativeElement.getBoundingClientRect());

    this.valueTest = event.target.valueAsNumber
  }


  testMove2(event) {
    this.valueTest2 = event.target.valueAsNumber
  }


  onChange = ( vlaue: any) => { }

  onTouched = () => { }

  writeValue(value: any):void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
