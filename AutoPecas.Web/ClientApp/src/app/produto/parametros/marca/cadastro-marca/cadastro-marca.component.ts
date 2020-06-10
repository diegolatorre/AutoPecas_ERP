import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarcaService } from 'src/app/service/marca.service';
import { Marca } from 'src/app/model/produto/marca.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SucessoCadastroComponent } from '../sucesso-cadastro/sucesso-cadastro.component';

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
    private modal: NzModalRef,
    private modalService: NzModalService
  ) { }

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
          this.btnName = `Editar`;
        }
      });

    } else {
      this.btnName = `Cadastrar`;
    }
  }

  submitForm() {

    if (this.btnName == 'Cadastrar') {
      this.marca = {
        nome: this.marcaForm.get('nome').value,
        descricao: this.marcaForm.get('descricao').value,
      } as Marca;

      this._service.incluir(this.marca).subscribe(() => {
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

      this.marca = {
        id: this.marca.id,
        nome: this.marcaForm.get('nome').value,
        descricao: this.marcaForm.get('descricao').value,
      } as Marca;

      this._service.editar(this.marca).subscribe(() => {


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
