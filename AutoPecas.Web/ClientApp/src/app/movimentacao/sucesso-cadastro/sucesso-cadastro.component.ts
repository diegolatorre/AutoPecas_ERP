import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sucesso-cadastro',
  templateUrl: './sucesso-cadastro.component.html',
  styleUrls: ['./sucesso-cadastro.component.css']
})
export class SucessoCadastroComponent implements OnInit {

  @Input() acao?: string;

  constructor(
    private modal: NzModalRef,
  ) { }

  ngOnInit(): void {
  }

  fechar() {
    this.modal.destroy()
  }

}
