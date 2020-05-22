import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngc-min-max',
  templateUrl: './min-max.component.html',
  styleUrls: ['./min-max.component.css']
})
export class MinMaxComponent implements OnInit {
@Input() minTemp: number;
@Input() maxTemp: number;

  constructor() { }

  ngOnInit(): void {
  }

}
