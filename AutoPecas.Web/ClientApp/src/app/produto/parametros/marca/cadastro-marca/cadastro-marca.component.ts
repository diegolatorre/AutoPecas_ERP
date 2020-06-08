import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarcaService } from 'src/app/service/marca.service';
import { ActivatedRoute } from '@angular/router';
import { Marca } from 'src/app/model/produto/marca.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

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

  constructor(
    private _service: MarcaService,
    private route: ActivatedRoute,
    private modal: NzModalRef
    ) { }

  title: string;
  btnName: string;

@Input() marca?: Marca;

  ngOnInit(): void {
    this.obter();
  }

  obter() {

    if (this.marca !== undefined) {

      this._service.obter(this.marca.id).subscribe(next => {

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

  submitFormEdit() {

    this.marca = {
      id: this.marca.id,
      nome: this.marcaForm.get('nome').value,
      descricao: this.marcaForm.get('descricao').value,
    } as Marca;

    this._service.editar(this.marca).subscribe(() => {
      this.modal.close();
    });
  }
}
