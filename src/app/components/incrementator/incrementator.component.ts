import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementator',
  templateUrl: './incrementator.component.html',
  styleUrls: ['./incrementator.component.css']
})
export class IncrementatorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() legend: string = 'Leyenda';
  @Input() percentage: number = 50;

  @Output() cValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(val: number) {

    if (val >= 100) {
      this.percentage = 100;
    } else if ( val <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = val;
    }

    this.txtProgress.nativeElement.value = this.percentage;

    this.cValue.emit( this.percentage );
    
    this.txtProgress.nativeElement.focus();
  }

  changeValue(val: number) {
    if (this.percentage >= 100 && val > 0) {
      this.percentage = 100;
      return;
    } else if (this.percentage <= 0 && val < 0) {
      this.percentage = 0;
      return;
    }

    this.percentage += val;

    this.cValue.emit( this.percentage );
  }

}
