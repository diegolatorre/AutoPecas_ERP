import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CadastroCategoriaComponent } from '../cadastro-categoria/cadastro-categoria.component';

@Component({
  selector: 'app-sucesso-cadastro',
  templateUrl: './sucesso-cadastro.component.html',
  styleUrls: ['./sucesso-cadastro.component.css']
})
export class SucessoCadastroComponent implements OnInit {

  @Input() acao?: string;

  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
  }

  fechar() {
    this.modal.destroy()
  }


  cadastrarCategoria() {
    const cadastroModal = this.modalService.create({
      nzContent: CadastroCategoriaComponent,
      nzTitle: 'Nova Categoria',
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
  }
}

