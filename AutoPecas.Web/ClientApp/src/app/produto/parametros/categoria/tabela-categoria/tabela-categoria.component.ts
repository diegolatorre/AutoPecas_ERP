import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { Categoria } from 'src/app/model/categoria.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabela-categoria',
  templateUrl: './tabela-categoria.component.html',
  styleUrls: ['./tabela-categoria.component.css']
})
export class TabelaCategoriaComponent implements OnInit {

  listOfData: Categoria[];
  value?: string;
  filtro?: FiltroSpec;

  contentSearch: string;

  constructor(private _service: CategoriaService) { }

  ngOnInit(): void {
    this.listar();
  }


  search() {
    console.log(this.contentSearch);

    this._service.search("teste").subscribe(next => {
      this.listOfData = next;
    });
  }

  listar() {
    this._service.listar(this.filtro).subscribe(next => {
      console.log(next);
      // this.filtro.total = next.total;
      this.listOfData = next;
    });
  }
}
