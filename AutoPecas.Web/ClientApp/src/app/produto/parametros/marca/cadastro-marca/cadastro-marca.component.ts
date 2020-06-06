import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarcaService } from 'src/app/service/marca.service';
import { ActivatedRoute } from '@angular/router';
import { Marca } from 'src/app/model/produto/marca.model';

@Component({
  selector: 'app-cadastro-marca',
  templateUrl: './cadastro-marca.component.html',
  styleUrls: ['./cadastro-marca.component.css']
})
export class CadastroMarcaComponent implements OnInit {

  marcaForm = new FormGroup({
    descricao: new FormControl(null, [Validators.required]),
    nome: new FormControl(null, [Validators.required])
  });

  constructor(private _service: MarcaService, private route: ActivatedRoute) { }

  marca: Marca = { descricao: 'teste', nome: 'ssas', id: 0 };

  title: string;
  marId: number;
  btnName: string;


  ngOnInit(): void {
    this.route.params.subscribe(params => this.marId = params['id']);
    this.obter();
  }

  obter() {

    if (this.marId !== undefined) {

      this._service.obter(this.marId).subscribe(next => {

        this.marca = next;

        this.marcaForm = new FormGroup({
          descricao: new FormControl(this.marca.descricao, [Validators.required]),
          nome: new FormControl(this.marca.nome, [Validators.required])
        });

        if (this.marca !== undefined) {
          this.title = `Editar Marca: ${this.marca.id}`;
          this.btnName = `Editar`;
        }
      });

    } else {

      this.title = `Cadastrar Marca`;
      this.btnName = `Cadastrar`;

    }
  }

  limpar() {
    this.marcaForm.reset();
  }

  submitForm() {

    this.marca = {
      nome: this.marcaForm.get('nome').value,
      descricao: this.marcaForm.get('descricao').value,
    } as Marca;

    this._service.incluir(this.marca).subscribe();
  }
}
