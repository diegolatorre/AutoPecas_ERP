import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-filtro-produto',
  templateUrl: './filtro-produto.component.html',
  styleUrls: ['./filtro-produto.component.css']
})
export class FiltroProdutoComponent implements OnInit {
  filtroForm = new FormGroup(
    {
      descricao: new FormControl(null),
    });

  @Input() filtro?: any;

  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
    this.filtroForm.patchValue({
      descricao: this.filtro.descricao
    });
  }

  limpar(): void {
    this.filtroForm.reset();
  }

  filtrar(): void {
    this.modal.destroy(this.filtroForm.value);
  }

}
