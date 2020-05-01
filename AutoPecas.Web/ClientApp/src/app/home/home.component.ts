import { Component, OnInit } from '@angular/core';
import { PecaService } from '../service/peca.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public constructor(
    private pecaService: PecaService
  ) { }

  ngOnInit() {
    this.pecaService.listar().subscribe(next => console.log(next));
  }
}
