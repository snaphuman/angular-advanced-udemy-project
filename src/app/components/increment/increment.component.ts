import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit {

  @Input('value') progress: number = 0;
  @Input() btnClass: string = 'btn-primary';

  @Output('value') outputValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  changeValue( value: number ) {

    if ( this.progress >= 100 && value >= 0 ) {
      this.outputValue.emit(100);
      return this.progress = 100;
    }

    if ( this.progress <= 0 && value < 0 ) {
      this.outputValue.emit(0);
      return this.progress = 0;
    }

    this.outputValue.emit(this.progress + value);
    this.progress = this.progress + value;
  }
}
