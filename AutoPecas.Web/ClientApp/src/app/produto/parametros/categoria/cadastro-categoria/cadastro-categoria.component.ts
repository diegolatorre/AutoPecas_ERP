import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/model/produto/categoria.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SucessoCadastroComponent } from '../sucesso-cadastro/sucesso-cadastro.component';

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

  constructor(
    private _service: CategoriaService,
    private modal: NzModalRef,
    private modalService: NzModalService
  ) { }

  @Input() categoria?: Categoria;

  btnName: string;


  ngOnInit(): void {
    this.obter();
  }

  obter() {

    if (this.categoria !== undefined) {

      this._service.obter(this.categoria.id).subscribe(next => {

        this.categoria = next;

        this.categoriaForm = new FormGroup({
          descricao: new FormControl(this.categoria.descricao, [Validators.required]),
          nome: new FormControl(this.categoria.nome, [Validators.required])
        });

        if (this.categoria !== undefined) {
          this.btnName = `Editar`;
        }
      });

    } else {
      this.btnName = `Cadastrar`;
    }
  }

  limpar() {
    this.categoriaForm.reset();
  }

  submitForm() {

    if (this.btnName == 'Cadastrar') {
      this.categoria = {
        nome: this.categoriaForm.get('nome').value,
        descricao: this.categoriaForm.get('descricao').value,
      } as Categoria;

      this._service.incluir(this.categoria).subscribe(() => {

        const modalResult = this.modalService.create({
          nzTitle: null,
          nzContent: SucessoCadastroComponent,
          nzComponentParams: {
            acao: 'cadastrado'
          },
          nzWidth: "80%",
          nzFooter: null,
          nzClosable: false,
          nzMaskClosable: false
        });

        this.modal.close();
      });

    } else {

      this.categoria = {
        id: this.categoria.id,
        nome: this.categoriaForm.get('nome').value,
        descricao: this.categoriaForm.get('descricao').value,
      } as Categoria;

      this._service.editar(this.categoria).subscribe(() => {

        const modalResult = this.modalService.create({
          nzTitle: null,
          nzContent: SucessoCadastroComponent,
          nzComponentParams: {
            acao: 'editado'
          },
          nzWidth: "80%",
          nzFooter: null,
          nzClosable: false,
          nzMaskClosable: false
        });

        this.modal.close();
      });
    }
  }

  fechar() {
    this.modal.destroy();
  }
}
