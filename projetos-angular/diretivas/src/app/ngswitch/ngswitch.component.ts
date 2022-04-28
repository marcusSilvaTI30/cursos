import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngswitch',
  templateUrl: './ngswitch.component.html',
  styleUrls: ['./ngswitch.component.sass']
})
export class NgswitchComponent implements OnInit {

  aba:string = 'home';


  constructor() { }

  ngOnInit(): void {
  }

}
