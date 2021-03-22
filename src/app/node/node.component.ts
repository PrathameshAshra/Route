import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
@Input() block: any;

  constructor() { }
  // tslint:disable-next-line: typedef
  blockClicked(){
    console.log('do something');
  }
  onMouseDown(): void{
    console.log('somethin Hpann ');
  }
  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

}
