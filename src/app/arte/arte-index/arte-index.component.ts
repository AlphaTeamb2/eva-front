import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-arte-index',
  templateUrl: './arte-index.component.html',
  styleUrls: ['./arte-index.component.css']
})
export class ArteIndexComponent implements OnInit {

  constructor(
    private title: Title

  ) { }

  ngOnInit() {
    this.title.setTitle('Início');
  }

}
