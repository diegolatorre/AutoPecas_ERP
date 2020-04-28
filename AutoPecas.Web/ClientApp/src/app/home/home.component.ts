import { Component, OnInit } from '@angular/core';
import { PecaService } from '../service/peca.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  pecas$: Observable<any>;

  constructor(
    private pecaService: PecaService
  ) { }

  ngOnInit() {
    this.pecas$ = this.pecaService.listar();
  }
}
