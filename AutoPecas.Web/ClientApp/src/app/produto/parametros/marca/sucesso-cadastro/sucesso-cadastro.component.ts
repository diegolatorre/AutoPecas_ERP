import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CadastroMarcaComponent } from '../cadastro-marca/cadastro-marca.component';

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


  cadastrarMarca() {
    const cadastroModal = this.modalService.create({
      nzContent: CadastroMarcaComponent,
      nzTitle: 'Nova Marca',
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
  }
}

