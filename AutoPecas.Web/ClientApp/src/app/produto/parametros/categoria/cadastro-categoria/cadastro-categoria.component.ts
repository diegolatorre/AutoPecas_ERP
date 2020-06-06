import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/model/produto/categoria.model';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent implements OnInit {

  categoriaForm = new FormGroup({
    descricao: new FormControl(null, [Validators.required]),
    nome: new FormControl(null, [Validators.required])
  });

  constructor(private _service: CategoriaService, private route: ActivatedRoute) { }

  categoria: Categoria = { descricao: 'teste', nome: 'ssas', id: 0 };

  title: string;
  catId: number;
  btnName: string;


  ngOnInit(): void {
    this.route.params.subscribe(params => this.catId = params['id']);
    this.obter();
  }

  obter() {

    if (this.catId !== undefined) {

      this._service.obter(this.catId).subscribe(next => {

        this.categoria = next;

        this.categoriaForm = new FormGroup({
          descricao: new FormControl(this.categoria.descricao, [Validators.required]),
          nome: new FormControl(this.categoria.nome, [Validators.required])
        });

        if (this.categoria !== undefined) {
          this.title = `Editar Categoria: ${this.categoria.id}`;
          this.btnName = `Editar`;
        }
      });

    } else {

      this.title = `Cadastrar Categoria`;
      this.btnName = `Cadastrar`;

    }
  }

  limpar() {
    this.categoriaForm.reset();
  }

  submitForm() {

    this.categoria = {
      nome: this.categoriaForm.get('nome').value,
      descricao: this.categoriaForm.get('descricao').value,
    } as Categoria;

    this._service.incluir(this.categoria).subscribe();
  }
}
