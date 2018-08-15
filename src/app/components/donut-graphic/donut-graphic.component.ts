import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donut-graphic',
  templateUrl: './donut-graphic.component.html',
  styleUrls: ['./donut-graphic.component.css']
})
export class DonutGraphicComponent implements OnInit {

  @Input() chartLabels: string[] = [];
  @Input() chartData: number[] = [];
  // tslint:disable-next-line:no-inferrable-types
  @Input() chartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
