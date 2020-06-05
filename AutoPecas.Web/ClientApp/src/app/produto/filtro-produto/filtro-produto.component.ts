import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Marca } from 'src/app/model/produto/marca.model';
import { Categoria } from 'src/app/model/produto/categoria.model';

@Component({
  selector: 'app-filtro-produto',
  templateUrl: './filtro-produto.component.html',
  styleUrls: ['./filtro-produto.component.css']
})
export class FiltroProdutoComponent implements OnInit {
  filtroForm = new FormGroup(
    {
      descricao: new FormControl(null),
      marca: new FormControl(null),
      categoria: new FormControl(null),
    });

  @Input() filtro?: any;

  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
    this.filtroForm.patchValue({
      descricao: this.filtro.descricao,
      marca: this.filtro.marca,
      categoria: this.filtro.categoria
    });
  }

  limpar(): void {
    this.filtroForm.reset();
  }

  filtrar(): void {
    this.modal.destroy(this.filtroForm.value);
  }

  marcaSelecionada(marca: Marca) {
    this.filtroForm.get('marca').setValue(marca);
  }

  categoriaSelecionada(categoria: Categoria) {
    this.filtroForm.get('categoria').setValue(categoria);
  }

}
