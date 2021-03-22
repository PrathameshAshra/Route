import { Input, Output } from '@angular/core';
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
   
    }
  onMouseDown(): void{
    console.log('somethin Hpann ');
  }
  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

}
