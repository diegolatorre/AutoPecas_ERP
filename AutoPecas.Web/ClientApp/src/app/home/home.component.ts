import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  produtos: Produto[];

  public constructor () {}

  ngOnInit() { }

}
